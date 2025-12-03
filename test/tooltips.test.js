import ToolTips from '../src/modulos/ToolTips';
import Direccion from '../src/modulos/posicionamineto/Direccion';

// Mock del módulo Direccion
jest.mock('../src/modulos/posicionamineto/Direccion', () => ({
    posicionar: jest.fn()
}));

describe('ToolTips.js', () => {
    beforeEach(() => {
        // Limpiar DOM
        document.body.innerHTML = '';

        // Limpiar mocks
        jest.clearAllMocks();

        // Mock de HTMLElement.prototype para offset properties
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
            configurable: true,
            get() { return 100; }
        });

        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
            configurable: true,
            get() { return 50; }
        });
    });

    afterEach(() => {
        // Limpiar tooltips
        ToolTips.destroy();
        jest.restoreAllMocks();
    });

    describe('Inicialización', () => {
        test('debe inicializar tooltips con evento hover por defecto', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="Tooltip 1">Botón 1</button>
                <button class="tips-ele" data-tips="Tooltip 2">Botón 2</button>
            `;

            ToolTips.iniciar();

            const buttons = document.querySelectorAll('.tips-ele');
            expect(buttons.length).toBe(2);
        });

        test('debe inicializar tooltips con evento click', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="Tooltip click" data-evt="click">Botón</button>
            `;

            ToolTips.iniciar();

            const button = document.querySelector('.tips-ele');
            expect(button).not.toBeNull();
        });
    });

    describe('Evento Hover', () => {
        test('debe mostrar tooltip al hacer mouseenter', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="Hover tooltip" data-pos="top">Hover</button>
            `;

            ToolTips.iniciar();

            const button = document.querySelector('.tips-ele');
            const event = new MouseEvent('mouseenter', { bubbles: true });
            button.dispatchEvent(event);

            const tooltip = document.querySelector('.tips');
            expect(tooltip).not.toBeNull();
            expect(tooltip.innerHTML).toBe('Hover tooltip');
            expect(Direccion.posicionar).toHaveBeenCalledWith('top', button, tooltip, true);
        });

        test('debe ocultar tooltip al hacer mouseleave', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="Hover tooltip">Hover</button>
            `;

            ToolTips.iniciar();

            const button = document.querySelector('.tips-ele');

            // Mostrar tooltip
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            expect(document.querySelector('.tips')).not.toBeNull();

            // Ocultar tooltip
            button.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
            expect(document.querySelector('.tips')).toBeNull();
        });

        test('debe usar hover como evento por defecto si no se especifica data-evt', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="Default hover">Botón</button>
            `;

            ToolTips.iniciar();

            const button = document.querySelector('.tips-ele');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            expect(document.querySelector('.tips')).not.toBeNull();
        });
    });

    describe('Evento Click', () => {
        test('debe mostrar tooltip al hacer click', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="Click tooltip" data-evt="click" data-pos="bottom">Click</button>
            `;

            ToolTips.iniciar();

            const button = document.querySelector('.tips-ele');
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            const tooltip = document.querySelector('.tips');
            expect(tooltip).not.toBeNull();
            expect(tooltip.innerHTML).toBe('Click tooltip');
            expect(Direccion.posicionar).toHaveBeenCalledWith('bottom', button, tooltip, true);
        });

        test('debe crear complemento al usar evento click', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="Click tooltip" data-evt="click">Click</button>
            `;

            ToolTips.iniciar();

            const button = document.querySelector('.tips-ele');
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            const complemento = document.querySelector('.tips-complemento');
            expect(complemento).not.toBeNull();
            expect(complemento.style.display).toBe('block');
        });

        test('debe ocultar tooltip al hacer click en el complemento', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="Click tooltip" data-evt="click">Click</button>
            `;

            ToolTips.iniciar();

            const button = document.querySelector('.tips-ele');
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            const complemento = document.querySelector('.tips-complemento');
            complemento.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(document.querySelector('.tips')).toBeNull();
            expect(complemento.style.display).toBe('none');
        });

        test('debe remover tooltips anteriores al hacer click en otro elemento', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="Tooltip 1" data-evt="click">Botón 1</button>
                <button class="tips-ele" data-tips="Tooltip 2" data-evt="click">Botón 2</button>
            `;

            ToolTips.iniciar();

            const [button1, button2] = document.querySelectorAll('.tips-ele');

            button1.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(document.querySelectorAll('.tips').length).toBe(1);
            expect(document.querySelector('.tips').innerHTML).toBe('Tooltip 1');

            button2.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(document.querySelectorAll('.tips').length).toBe(1);
            expect(document.querySelector('.tips').innerHTML).toBe('Tooltip 2');
        });
    });

    describe('Posicionamiento', () => {
        test('debe llamar a Direccion.posicionar con la posición correcta', () => {
            const positions = ['top', 'bottom', 'left', 'right'];

            positions.forEach(pos => {
                document.body.innerHTML = `
                    <button class="tips-ele" data-tips="Test" data-pos="${pos}">Botón</button>
                `;

                ToolTips.iniciar();

                const button = document.querySelector('.tips-ele');
                button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

                const tooltip = document.querySelector('.tips');
                expect(Direccion.posicionar).toHaveBeenCalledWith(pos, button, tooltip, true);

                ToolTips.destroy();
                jest.clearAllMocks();
            });
        });
    });

    describe('Evento Resize', () => {
        test('debe reposicionar tooltip al hacer resize de la ventana', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="Resize test" data-pos="top">Botón</button>
            `;

            ToolTips.iniciar();

            const button = document.querySelector('.tips-ele');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            jest.clearAllMocks();

            // Simular resize
            window.dispatchEvent(new Event('resize'));

            // Debe llamar a posicionar nuevamente
            expect(Direccion.posicionar).toHaveBeenCalled();
        });
    });

    describe('Destroy', () => {
        test('debe remover el complemento y tooltips existentes', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="Test" data-evt="click">Botón</button>
            `;

            ToolTips.iniciar();

            const button = document.querySelector('.tips-ele');
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(document.querySelector('.tips')).not.toBeNull();
            expect(document.querySelector('.tips-complemento')).not.toBeNull();

            ToolTips.destroy();

            // Verificar que el complemento fue removido
            expect(document.querySelector('.tips-complemento')).toBeNull();
        });

        test('debe remover event listeners de resize', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="Test">Botón</button>
            `;

            ToolTips.iniciar();

            const button = document.querySelector('.tips-ele');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            jest.clearAllMocks();

            ToolTips.destroy();

            // Después de destroy, resize no debe llamar a posicionar
            window.dispatchEvent(new Event('resize'));
            expect(Direccion.posicionar).not.toHaveBeenCalled();
        });
    });

    describe('Contenido HTML', () => {
        test('debe soportar contenido HTML en data-tips', () => {
            document.body.innerHTML = `
                <button class="tips-ele" data-tips="<strong>Bold</strong> text">Botón</button>
            `;

            ToolTips.iniciar();

            const button = document.querySelector('.tips-ele');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const tooltip = document.querySelector('.tips');
            expect(tooltip.innerHTML).toBe('<strong>Bold</strong> text');
            expect(tooltip.querySelector('strong')).not.toBeNull();
        });
    });
});
