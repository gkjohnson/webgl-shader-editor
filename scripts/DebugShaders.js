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
        let r = 0
        let g = 0
        let b = 0
        let a = 0
        
        if (/^vec/.test(type)) {
            r = `${name}.r`
            g = `${name}.g`
            if (/^vec(3|4)/.test(type)) b = `${name}.b`
            if (/^vec4/.test(type)) a = `${name}.a`
        }
        else if(type === 'bool') {
            r = `${name} ? 1 : 0`
            g = r
            b = r
            a = r
        }
        else if(/^(int|uint)/.test(type)) {
            r = `float((${name} << 0 ) & 0xFF) / 0xFF`
            g = `float((${name} << 8 ) & 0xFF) / 0xFF`
            b = `float((${name} << 16) & 0xFF) / 0xFF`
            a = `float((${name} << 24) & 0xFF) / 0xFF`
        }
        else if(type === 'float') {
            r = `${name}`
        }

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