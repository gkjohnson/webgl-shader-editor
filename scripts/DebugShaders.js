DebugShaders = {}

;(function() {

    const NEGATE_UNIFORM = '_negate_'
    const variableRegex = /((((precision|varying|uniform|attribute)\s+)?)((highp|mediump|lowp)\s+)?)(vec4|vec3|vec2|float|int|uint|bool)\s+([A-Za-z0-9]+)/
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 1
    canvas.height = 1

    const normalize = shader => {
        return shader
            .replace(/\/\/[^\n]*\n/g, '')               // comment line
            .replace(/\/\*(\*(?!\/)|[^*])*\*\//, '')    // block comment
            .replace(/(\n|\s)+/g, ' ')
            .replace(/\s*{\s*/g, '\n{\n')
            .replace(/\s*}\s*/g, '\n}\n')
            .replace(/\s*;\s*/g, ';\n')
            .replace(/void\s+main\s*\(\)(\s|\n)*{/, 'void main() {')
    }

    const toGlFragColorLine = (type, name) => {
        let r = 0
        let g = 0
        let b = 0
        let a = 1
        
        const neg = `(${NEGATE_UNIFORM} ? -1.0 : 1.0)`

        if (/^vec/.test(type)) {
            // TODO: Pack these more so more of
            // the data can be read back out, otherwise
            // they're clamped from 0 to 1.0
            r = `${name}.r * ${neg}`
            g = `${name}.g * ${neg}`
            if (/^vec(3|4)/.test(type)) b = `${name}.b * ${neg}`
            if (/^vec4/.test(type)) a = `${name}.a * ${neg}`
        }
        else if(type === 'bool') {
            r = `${name} ? 1 : 0`
            g = r
            b = r
            a = r
        }
        else if(/^(int|uint)/.test(type)) {
            r = `float(((${name} * int(${neg})) << 0 ) & 0xFF) / 0xFF`
            g = `float(((${name} * int(${neg})) << 8 ) & 0xFF) / 0xFF`
            b = `float(((${name} * int(${neg})) << 16) & 0xFF) / 0xFF`
            a = `float(((${name} * int(${neg})) << 24) & 0xFF) / 0xFF`
        }
        else if(type === 'float') {
            // TODO : Pack this into bytes so we can
            // read it back out as a larger float
            r = `${name}`
        }

        return `gl_FragColor = vec4(${r},${g},${b},${a});`
    }

    DebugShaders.enumerate = (vs, fs, negate = false) => {
        vs = normalize(vs)
        fs = normalize(fs)

        const shaders = []
        const fsVarying = []

        // output color for each variable in the frag shader
        const lines = fs.split('\n')
        lines
            .forEach((line, i) => {
                const matches = line.match(variableRegex)
                if (matches) {
                    const prefix = (matches[1] || '').trim()
                    const type = matches[7].trim()
                    const name = matches[8].trim()

                    if (prefix) {
                        if (prefix === 'varying') fsVarying.push({ type, name, line: i })
                        return
                    }

                    const newlines = [].concat(lines)
                    newlines[i] += '\n' + toGlFragColorLine(type, name, negate) + '\nreturn;\n'

                    shaders.push({
                        type,
                        name,
                        vertexShader: vs,
                        fragmentShader: newlines.join('\n'),
                        line: i
                    })
                }
            })


        // output color for each varying variable in the frag shader
        fsVarying
            .forEach(it => {
                const mainSig = 'void main() {'
                const res = fs.replace(mainSig, mainSig + '\n' + toGlFragColorLine(it.type, it.name, negate) + '\nreturn;\n')
                shaders.push({
                    type: it.type,
                    name: it.name,
                    vertexShader: vs,
                    fragmentShader: res,
                    line: it.line
                })
            })

        for(let i in shaders) {
            shaders[i].fragmentShader = `
            uniform bool ${NEGATE_UNIFORM};
            ${shaders[i].fragmentShader}
            `
        }

        return shaders
    }

    DebugShaders.readPixel = (img, x, y) => {
        ctx.clearRect(0, 0, 1, 1)
        ctx.drawImage(img, x, y, 1, 1, 0, 0, 1, 1)

        const data = ctx.getImageData(0,0,1,1).data

        return {
            r: data[0],
            g: data[1],
            b: data[2],
            a: data[3]
        }
    }

    DebugShaders.pixelToArray = (px, type, prec = 5) => {
        const cv = f => parseFloat((f / 255.0).toPrecision(prec))

        if (type === 'vec2') return [cv(px.r), cv(px.g)]
        if (type === 'vec3') return [cv(px.r), cv(px.g), cv(px.b)]
        if (type === 'vec4') return [cv(px.r), cv(px.g), cv(px.b), cv(px.a)]
        if (type === 'bool') return [!!px.r]
        if (type === 'int'); // TODO
        if (type === 'uint'); // TODO
        if (type === 'float') return [cv(res.r)]
    }
})()