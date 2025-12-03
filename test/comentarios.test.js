import ComentarioDinamico from '../src/modulos/ComentariosDinamicos';
import Direccion from '../src/modulos/posicionamineto/Direccion';

// Mock del módulo Direccion
jest.mock('../src/modulos/posicionamineto/Direccion', () => ({
    posicionar: jest.fn()
}));

describe('ComentariosDinamicos.js', () => {
    beforeEach(() => {
        // Limpiar DOM
        document.body.innerHTML = '';

        // Limpiar mocks
        jest.clearAllMocks();

        // Mock de HTMLElement.prototype para offset properties
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
            configurable: true,
            get() { return 200; }
        });

        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
            configurable: true,
            get() { return 100; }
        });
    });

    afterEach(() => {
        // Limpiar comentarios
        ComentarioDinamico.destroy();
        jest.restoreAllMocks();
    });

    describe('Inicialización', () => {
        test('debe inicializar comentarios con evento hover por defecto', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Comentario 1">Botón 1</button>
                <button class="com-trigger" data-info="Comentario 2">Botón 2</button>
            `;

            ComentarioDinamico.iniciar();

            const buttons = document.querySelectorAll('.com-trigger');
            expect(buttons.length).toBe(2);
        });

        test('debe inicializar comentarios con evento click', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Comentario click" data-evt="click">Botón</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');
            expect(button).not.toBeNull();
        });
    });

    describe('Evento Hover', () => {
        test('debe mostrar comentario al hacer mouseenter', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Hover comentario" data-pos="top">Hover</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');
            const event = new MouseEvent('mouseenter', { bubbles: true });
            button.dispatchEvent(event);

            const comentario = document.querySelector('.com-dinamico');
            expect(comentario).not.toBeNull();
            expect(comentario.innerHTML).toBe('Hover comentario');
            expect(comentario.style.display).toBe('block');
            expect(Direccion.posicionar).toHaveBeenCalledWith('top', button, comentario, true);
        });

        test('debe ocultar comentario al hacer mouseleave', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Hover comentario">Hover</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');

            // Mostrar comentario
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            expect(document.querySelector('.com-dinamico')).not.toBeNull();

            // Ocultar comentario
            button.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
            expect(document.querySelector('.com-dinamico')).toBeNull();
        });

        test('debe usar hover como evento por defecto si no se especifica data-evt', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Default hover">Botón</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            expect(document.querySelector('.com-dinamico')).not.toBeNull();
        });

        test('debe usar "abajo" como posición por defecto', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Sin posición">Botón</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const comentario = document.querySelector('.com-dinamico');
            expect(Direccion.posicionar).toHaveBeenCalledWith('abajo', button, comentario, true);
        });
    });

    describe('Evento Click', () => {
        test('debe mostrar comentario al hacer click', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Click comentario" data-evt="click" data-pos="right">Click</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            const comentario = document.querySelector('.com-dinamico');
            expect(comentario).not.toBeNull();
            expect(comentario.innerHTML).toBe('Click comentario');
            expect(comentario.style.display).toBe('block');
            expect(Direccion.posicionar).toHaveBeenCalledWith('right', button, comentario, true);
        });

        test('debe crear complemento al usar evento click (Singleton)', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Click comentario" data-evt="click">Click</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            const complemento = document.querySelector('.com-complemento');
            expect(complemento).not.toBeNull();
            expect(complemento.style.display).toBe('block');
        });

        test('debe reutilizar el mismo complemento (Singleton pattern)', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Click 1" data-evt="click">Botón 1</button>
                <button class="com-trigger" data-info="Click 2" data-evt="click">Botón 2</button>
            `;

            ComentarioDinamico.iniciar();

            const [button1, button2] = document.querySelectorAll('.com-trigger');

            button1.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            const complemento1 = document.querySelector('.com-complemento');

            button2.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            const complemento2 = document.querySelector('.com-complemento');

            // Debe ser el mismo elemento (Singleton)
            expect(complemento1).toBe(complemento2);
            expect(document.querySelectorAll('.com-complemento').length).toBe(1);
        });

        test('debe ocultar comentario al hacer click en el complemento', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Click comentario" data-evt="click">Click</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            const complemento = document.querySelector('.com-complemento');
            complemento.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(document.querySelector('.com-dinamico')).toBeNull();
            expect(complemento.style.display).toBe('none');
        });

        test('debe manejar data-info vacío', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-evt="click">Sin info</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            const comentario = document.querySelector('.com-dinamico');
            expect(comentario).not.toBeNull();
            expect(comentario.innerHTML).toBe('');
        });
    });

    describe('Eventos de Ventana', () => {
        test('debe reposicionar comentario al hacer scroll', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Scroll test" data-pos="left">Botón</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            jest.clearAllMocks();

            // Simular scroll
            window.dispatchEvent(new Event('scroll'));

            // Debe llamar a posicionar nuevamente
            expect(Direccion.posicionar).toHaveBeenCalled();
        });

        test('debe reposicionar comentario al hacer resize', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Resize test" data-pos="bottom">Botón</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            jest.clearAllMocks();

            // Simular resize
            window.dispatchEvent(new Event('resize'));

            // Debe llamar a posicionar nuevamente
            expect(Direccion.posicionar).toHaveBeenCalled();
        });

        test('no debe reposicionar si no hay comentario activo', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Test">Botón</button>
            `;

            ComentarioDinamico.iniciar();

            // No mostrar comentario
            jest.clearAllMocks();

            // Simular scroll y resize
            window.dispatchEvent(new Event('scroll'));
            window.dispatchEvent(new Event('resize'));

            // No debe llamar a posicionar
            expect(Direccion.posicionar).not.toHaveBeenCalled();
        });
    });

    describe('Destroy', () => {
        test('debe remover todos los comentarios dinámicos', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Test 1">Botón 1</button>
                <button class="com-trigger" data-info="Test 2">Botón 2</button>
            `;

            ComentarioDinamico.iniciar();

            const [button1, button2] = document.querySelectorAll('.com-trigger');
            button1.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            button2.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            expect(document.querySelectorAll('.com-dinamico').length).toBeGreaterThan(0);

            ComentarioDinamico.destroy();

            expect(document.querySelectorAll('.com-dinamico').length).toBe(0);
        });

        test('debe remover el complemento', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Test" data-evt="click">Botón</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(document.querySelector('.com-complemento')).not.toBeNull();

            ComentarioDinamico.destroy();

            expect(document.querySelector('.com-complemento')).toBeNull();
        });

        test('debe remover event listeners de elementos', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="Test">Botón</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');

            ComentarioDinamico.destroy();

            // Después de destroy, los eventos no deben crear comentarios
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            expect(document.querySelector('.com-dinamico')).toBeNull();
        });
    });

    describe('Contenido HTML', () => {
        test('debe soportar contenido HTML en data-info', () => {
            document.body.innerHTML = `
                <button class="com-trigger" data-info="<strong>Bold</strong> <em>italic</em>">Botón</button>
            `;

            ComentarioDinamico.iniciar();

            const button = document.querySelector('.com-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const comentario = document.querySelector('.com-dinamico');
            expect(comentario.innerHTML).toBe('<strong>Bold</strong> <em>italic</em>');
            expect(comentario.querySelector('strong')).not.toBeNull();
            expect(comentario.querySelector('em')).not.toBeNull();
        });
    });
});
