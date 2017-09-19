DebugShaders = {}

;(function() {

    const variableRegex = /((((precision|varying|uniform)\s+)?)((highp|mediump|lowp)\s+)?)(vec4|vec3|vec2|float|int|uint|bool)\s+([A-Za-z0-9]+)/

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
        let r, g, b, a
        if (/^vec/.test(type)) r = `${name}.r`
        else r = name

        if (/^vec/.test(type)) g = `${name}.g`
        else g = 0

        if (/^vec(3|4)/.test(type)) b = `${name}.b`
        else b = 0

        if (/^vec4/.test(type)) a = `${name}.a`
        else a = 1

        return `gl_FragColor = vec4(${r},${g},${b},${a});`
    }

    DebugShaders.enumerate = (vs, fs) => {
        vs = normalize(vs)
        fs = normalize(fs)

        const shaders = []
        const lines = fs.split('\n')
        lines
            .forEach((line, i) => {
                const matches = line.match(variableRegex)
                if (matches) {
                    const prefix = (matches[1] || '').trim()
                    const type = matches[7].trim()
                    const name = matches[8].trim()

                    console.log("HERE")

                    if (prefix) return

                    const newlines = [].concat(lines)
                    newlines[i] += '\n' + toGlFragColorLine(type, name) + '\nreturn;\n'

                    shaders.push({
                        vertexShader: vs,
                        fragmentShader: newlines.join('\n')
                    })

                    console.log(newlines.join('\n'))
                }
            })

        return shaders
    }
})()