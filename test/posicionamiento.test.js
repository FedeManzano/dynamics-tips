import Posicionamiento from '../src/modulos/posicionamineto/Posicionamiento';

describe('Posicionamiento.js', () => {
    let origen;
    let elemento;

    beforeEach(() => {
        // Configurar DOM básico
        document.body.innerHTML = `
            <div id="origen" style="width: 100px; height: 50px;"></div>
            <div id="elemento" style="width: 200px; height: 100px; position: absolute;"></div>
        `;
        origen = document.getElementById('origen');
        elemento = document.getElementById('elemento');

        // Mock getBoundingClientRect para origen
        origen.getBoundingClientRect = jest.fn(() => ({
            top: 300,
            left: 300,
            bottom: 350,
            right: 400,
            width: 100,
            height: 50
        }));

        // Mock getBoundingClientRect para elemento
        elemento.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            bottom: 100,
            right: 200,
            width: 200,
            height: 100
        }));

        // Mock propiedades de offset usando spyOn en el prototipo
        // Mock propiedades de offset usando Object.defineProperty en el prototipo
        // Esta es la forma más robusta en JSDOM para propiedades de solo lectura
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
            configurable: true,
            get() {
                if (this.id === 'origen') return 100;
                if (this.id === 'elemento') return 200;
                return 0;
            }
        });

        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
            configurable: true,
            get() {
                if (this.id === 'origen') return 50;
                if (this.id === 'elemento') return 100;
                return 0;
            }
        });

        // Mock window properties
        Object.defineProperty(window, 'pageXOffset', { value: 0, writable: true });
        Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
        Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
        Object.defineProperty(document.documentElement, 'clientWidth', { value: 1024, writable: true });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Verificaciones de Espacio (puede...)', () => {
        test('puedeArriba: debe retornar true si hay espacio suficiente', () => {
            // Top origen = 300, height elemento = 100. Espacio = 300. Necesita 100 + 6.
            expect(Posicionamiento.puedeArriba(origen, elemento)).toBe(true);
        });

        test('puedeArriba: debe retornar false si NO hay espacio suficiente', () => {
            origen.getBoundingClientRect = jest.fn(() => ({ top: 50 })); // Solo 50px espacio arriba
            expect(Posicionamiento.puedeArriba(origen, elemento)).toBe(false);
        });

        test('puedeAbajo: debe retornar true si hay espacio suficiente', () => {
            // Window height = 800. Origen bottom = 350. Espacio abajo = 450. Necesita 100 + 6.
            expect(Posicionamiento.puedeAbajo(origen, elemento)).toBe(true);
        });

        test('puedeAbajo: debe retornar false si NO hay espacio suficiente', () => {
            window.innerHeight = 400; // Ventana pequeña
            // Origen bottom = 350. Espacio abajo = 50. Necesita 106.
            expect(Posicionamiento.puedeAbajo(origen, elemento)).toBe(false);
        });

        test('puedeDerecha: debe retornar true si hay espacio suficiente', () => {
            // Window width = 1024. Origen left = 300. Origen width = 100.
            // Espacio derecha = 1024 - 300 - 100 - 80 = 544. Necesita 200 + 5.
            expect(Posicionamiento.puedeDerecha(origen, elemento)).toBe(true);
        });

        test('puedeIzquierda: debe retornar true si hay espacio suficiente', () => {
            // Origen left = 300. Necesita 200 + 5.
            expect(Posicionamiento.puedeIzquierda(origen, elemento)).toBe(true);
        });
    });

    describe('Cálculos de Posición Inicial', () => {
        test('posicionamientoInicialX: debe calcular correctamente', () => {
            // Left 300 + Scroll 0
            expect(Posicionamiento.posicionamientoInicialX(origen, elemento)).toBe(300);
            expect(elemento.style.left).toBe('300px');
        });

        test('posicionamientoInicialY: debe calcular correctamente', () => {
            // Top 300 + Scroll 0
            expect(Posicionamiento.posicionamientoInicialY(origen, elemento)).toBe(300);
            expect(elemento.style.top).toBe('300px');
        });
    });

    describe('Métodos de Posicionamiento', () => {
        test('posicionarArriba: debe aplicar estilos correctos', () => {
            Posicionamiento.posicionarArriba(origen, elemento);
            // Top: 300 (origen top) - 100 (ele height) - 5 = 195
            expect(elemento.style.top).toBe('195px');
            // El left NO se establece si no hay topes, verificar que esté vacío
            // Centrado horizontal solo se aplica si hay desbordamiento
            expect(elemento.style.left).toBe('');  // Cambio: esperamos vacío
            expect(elemento.style.transform).toBe('translateY(-10px)');
        });

        test('posicionarAbajo: debe aplicar estilos correctos', () => {
            Posicionamiento.posicionarAbajo(origen, elemento);
            // Top: 300 (origen top) + 50 (origen height) + 5 = 355
            expect(elemento.style.top).toBe('355px');
            expect(elemento.style.transform).toBe('translateY(10px)');
        });

        test('posicionarIzquierda: debe aplicar estilos correctos', () => {
            Posicionamiento.posicionarIzquierda(origen, elemento);
            // Left: 300 (origen left) - 200 (ele width) - 25 = 75
            expect(elemento.style.left).toBe('75px');
            expect(elemento.style.transform).toBe('translateX(-10px)');
        });

        test('posicionarDerecha: debe aplicar estilos correctos', () => {
            Posicionamiento.posicionarDerecha(origen, elemento);
            // Left: 300 (origen left) + 100 (origen width) + 15 = 415
            expect(elemento.style.left).toBe('415px');
            expect(elemento.style.transform).toBe('translateX(10px)');
        });
    });

    describe('Manejo de Topes (Bordes)', () => {
        test('topeIzquierda: debe detectar desbordamiento', () => {
            // Simular elemento fuera de pantalla a la izquierda (-50px)
            elemento.getBoundingClientRect = jest.fn(() => ({ left: -50 }));
            expect(Posicionamiento.topeIzquierda(elemento)).toBe(50);
        });

        test('topeArriba: debe detectar desbordamiento', () => {
            // Simular elemento fuera de pantalla arriba (-20px)
            elemento.getBoundingClientRect = jest.fn(() => ({ top: -20 }));
            expect(Posicionamiento.topeArriba(elemento)).toBe(26); // (-20 - 6) * -1
        });
    });
});
