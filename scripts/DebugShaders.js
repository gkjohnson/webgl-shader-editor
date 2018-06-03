window.DebugShaders = {};
const DebugShaders = window.DebugShaders;

(function () {

    const NEGATE_UNIFORM = '_negate_';
    const MAIN_SIG = 'void main() {';

    const variableRegex = /((((precision|varying|uniform|attribute)\s+)?)((highp|mediump|lowp)\s+)?)(vec4|vec3|vec2|float|int|uint|bool)\s+([A-Za-z0-9]+)/;

    // Clean up the shader to make it easer to parse
    const normalize = shader => {

        return shader
            .replace(/\/\/[^\n]*\n/g, '') // remove comment line
            .replace(/\/\*(\*(?!\/)|[^*])*\*\//g, '') // remove block comment
            .replace(/(\n|\s)+/g, ' ') // replace newlines or whitespace with a single space
            .replace(/\s*({|})\s*/g, '\n$1\n') // compress the area around braces
            .replace(/\s*;\s*/g, ';\n') // replace newlines after semicolons
            .replace(/(return|discard)\s*;/g, ';') // remove any early discards or returns
            .replace(/void\s+main\s*\(\)(\s|\n)*{/, MAIN_SIG); // clean up the main function signature

    };

    // Find the line range between which the main function lives
    const getMainFuncRange = shader => {

        const st = shader.indexOf(MAIN_SIG);
        const bef = shader.substr(0, st);
        const aft = shader.substr(st);

        const befLines = bef.replace(/[^\n]/g, '').length;
        const aftBraces = aft.replace(/[^{}\n]*/g, '');

        // count the braces to the end of the main function body
        let started = false;
        let braceCount = 0;
        let lines = 0;
        for (let i = 0; i < aftBraces.length; i++) {

            const ch = aftBraces[i];
            if (ch === '{') braceCount++;
            if (ch === '}') braceCount--;
            if (ch === '\n') lines++;

            if (braceCount > 0) started = true;
            if (started && braceCount === 0) break;

        }

        return { start: befLines, end: befLines + lines };

    };

    // get a line that outputs the given variable of type
    // as a fragment color
    const toGlFragColorLine = (type, name) => {

        let r = 0;
        let g = 0;
        let b = 0;
        let a = 1;

        const neg = `(${NEGATE_UNIFORM} ? -1.0 : 1.0)`;

        if (/^vec/.test(type)) {

            // TODO: Pack these more so more of
            // the data can be read back out, otherwise
            // they're clamped from 0 to 1.0
            r = `${name}.r * ${neg}`;
            g = `${name}.g * ${neg}`;
            if (/^vec(3|4)/.test(type)) b = `${name}.b * ${neg}`;
            if (/^vec4/.test(type)) a = `${name}.a * ${neg}`;

        } else if (type === 'bool') {

            r = `${name} ? 1 : 0`;
            g = r;
            b = r;
            a = r;

        } else if (/^(int|uint)/.test(type)) {

            r = `float(((${name} * int(${neg})) << 0 ) & 0xFF) / 0xFF`;
            g = `float(((${name} * int(${neg})) << 8 ) & 0xFF) / 0xFF`;
            b = `float(((${name} * int(${neg})) << 16) & 0xFF) / 0xFF`;
            a = `float(((${name} * int(${neg})) << 24) & 0xFF) / 0xFF`;

        } else if (type === 'float') {

            // TODO : Pack this into bytes so we can
            // read it back out as a larger float
            r = g = b = `${name}`;

        }

        return `gl_FragColor = vec4(${r},${g},${b},${a});`;

    };

    DebugShaders.enumerate = (vs, fs, negate = false) => {

        vs = normalize(vs);
        fs = normalize(fs);

        const vsRange = getMainFuncRange(vs);
        const fsRange = getMainFuncRange(fs);

        const shaders = [];
        const fsVarying = [];

        // generate shaders for outputing colors for each variable
        // in the vertex shader
        let lines = vs.split('\n');
        lines.forEach((line, i) => {

            if (i < vsRange.start || i > vsRange.end) return;
            if (/for|while/g.test(line)) return;

            const matches = line.match(variableRegex);
            if (matches) {

                const prefix = (matches[1] || '').trim();
                const type = matches[7].trim();
                const name = matches[8].trim();

                if (prefix) return;
                if (/(int|uint)/g.test(type)) return;

                const newVarName = `_out_${name}_`;
                const varyingLine = `varying ${type} ${newVarName};`;
                const newLines = [varyingLine].concat(lines);
                newLines[vsRange.end] = `\n${newVarName} = ${name};\n` + newLines[vsRange.end];

                const newvs = newLines.join('\n');
                const newfs = `${varyingLine}\n${fs}`.replace(MAIN_SIG, MAIN_SIG + '\n' + toGlFragColorLine(type, newVarName) + '\nreturn;\n');

                shaders.push({
                    type,
                    name,
                    vertexShader: newvs,
                    fragmentShader: newfs,
                    line: i,
                    fromShader: 'vertex'
                });

            }

        });

        // generate shaders for outputing colors for each variable
        // in the fragmnet shader
        lines = fs.split('\n');
        lines.forEach((line, i) => {

            if (/for|while/g.test(line)) return;

            const matches = line.match(variableRegex);
            if (matches) {

                const prefix = (matches[1] || '').trim();
                const type = matches[7].trim();
                const name = matches[8].trim();

                if (prefix) {

                    if (prefix === 'varying') fsVarying.push({ type, name, line: i });
                    return;

                }
                if (/(int|uint)/g.test(type)) return;
                if (i < fsRange.start || i > fsRange.end) return;

                const newlines = [].concat(lines);
                newlines[fsRange.end] = '\n' + toGlFragColorLine(type, name) + '\nreturn;\n' + newlines[fsRange.end];

                shaders.push({
                    type,
                    name,
                    vertexShader: vs,
                    fragmentShader: newlines.join('\n'),
                    line: i,
                    fromShader: 'fragment'
                });

            }

        });

        // output color for each varying variable in the frag shader
        fsVarying
            .forEach(it => {

                const res = fs.replace(MAIN_SIG, MAIN_SIG + '\n' + toGlFragColorLine(it.type, it.name) + '\nreturn;\n');
                shaders.push({
                    type: it.type,
                    name: it.name,
                    vertexShader: vs,
                    fragmentShader: res,
                    line: it.line,
                    fromShader: 'fragment'
                });

            });

        // prefix the _negate_ uniform on each shader which is
        // used to invert the color of each output
        for (let i in shaders) {

            shaders[i].fragmentShader = `
            uniform bool ${NEGATE_UNIFORM};
            ${shaders[i].fragmentShader}
            `;

        }

        return shaders;

    };

    DebugShaders.readPixel = (ctx, x, y) => {

        const data = ctx.getImageData(x, y, 1, 1).data;

        return {
            r: data[0],
            g: data[1],
            b: data[2],
            a: data[3]
        };

    };

    DebugShaders.pixelToArray = (px, type, prec = 5) => {

        const cv = f => parseFloat((f / 255.0).toPrecision(prec));

        if (type === 'vec2') return [cv(px.r), cv(px.g)];
        if (type === 'vec3') return [cv(px.r), cv(px.g), cv(px.b)];
        if (type === 'vec4') return [cv(px.r), cv(px.g), cv(px.b), cv(px.a)];
        if (type === 'bool') return [!!px.r];
        if (type === 'int'); // TODO
        if (type === 'uint'); // TODO
        if (type === 'float') return [cv(px.r)];

    };

})();
