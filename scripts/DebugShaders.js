DebugShaders = {}

;(function() {

    const variableRegex = /((((precision|varying|uniform)\s+)?)((highp|mediump|lowp)\s+)?)(vec4|vec3|vec2|float|int|uint|bool)\s+([A-Za-z0-9]+)/
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 100
    canvas.height = 100

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

                    if (prefix) return

                    const newlines = [].concat(lines)
                    newlines[i] += '\n' + toGlFragColorLine(type, name) + '\nreturn;\n'

                    shaders.push({
                        vertexShader: vs,
                        fragmentShader: newlines.join('\n')
                    })
                }
            })

        return shaders
    }

    DebugShaders.readPixelColor = (data, x, y, cb) => {
        // TODO: this may be resource intensive? Should create a pool?
        // Should probably require that the containing element
        // manage the image lifecycle        
        let img = new Image()
        img.onload = () => {
            ctx.drawImage(img, x, y, 1, 1, 0, 0, 1, 1)

            const data = ctx.getImageData(0,0,1,1).data
            cb({
                get x() { return this.r },
                get y() { return this.g },
                get z() { return this.b },
                get w() { return this.a },
                r: data[0],
                g: data[1],
                b: data[2],
                a: data[3]
            })

            img.onload = null
            img = null
        }

        img.src = data
    }
})()