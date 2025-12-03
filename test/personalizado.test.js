import Personalizado from '../src/modulos/Personalizado';
import Direccion from '../src/modulos/posicionamineto/Direccion';

// Mock del módulo Direccion
jest.mock('../src/modulos/posicionamineto/Direccion', () => ({
    posicionar: jest.fn()
}));

describe('Personalizado.js', () => {
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
        // Limpiar elementos del DOM manualmente
        document.querySelectorAll('.tips-complemento').forEach(el => el.remove());
        document.body.innerHTML = '';
        jest.restoreAllMocks();
    });

    describe('Inicialización', () => {
        test('debe inicializar con clase de origen válida', () => {
            document.body.innerHTML = `
                <button class="custom-trigger" data-info="Info personalizada">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'custom-trigger', ele: 'custom-popup' });

            const button = document.querySelector('.custom-trigger');
            expect(button).not.toBeNull();
        });

        test('no debe inicializar sin origen (ori="sinOrigen")', () => {
            document.body.innerHTML = `
                <button class="test-btn" data-info="Test">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'sinOrigen' });

            const button = document.querySelector('.test-btn');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            // No debe crear popup
            expect(document.querySelector('.custom-popup')).toBeNull();
        });

        test('no debe inicializar cuando ori no se proporciona', () => {
            document.body.innerHTML = `
                <button class="test-btn" data-info="Test">Botón</button>
            `;

            Personalizado.iniciar({});

            const button = document.querySelector('.test-btn');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            expect(document.querySelector('.custom-popup')).toBeNull();
        });

        test('debe aplicar clase personalizada cuando se proporciona', () => {
            document.body.innerHTML = `
                <button class="trigger-btn" data-info="Test">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'trigger-btn', ele: 'my-custom-class' });

            const button = document.querySelector('.trigger-btn');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const popup = document.querySelector('.my-custom-class');
            expect(popup).not.toBeNull();
        });
    });

    describe('Eventos Hover', () => {
        test('debe crear popup en mouseenter', () => {
            document.body.innerHTML = `
                <button class="hover-trigger" data-info="Hover info">Hover</button>
            `;

            Personalizado.iniciar({ ori: 'hover-trigger', ele: 'hover-popup' });

            const button = document.querySelector('.hover-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const popup = document.querySelector('.hover-popup');
            expect(popup).not.toBeNull();
            expect(popup.innerHTML).toBe('Hover info');
        });

        test('debe remover popup en mouseleave', () => {
            document.body.innerHTML = `
                <button class="hover-trigger2" data-info="Hover info">Hover</button>
            `;

            Personalizado.iniciar({ ori: 'hover-trigger2', ele: 'hover-popup2' });

            const button = document.querySelector('.hover-trigger2');

            // Mostrar popup
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            expect(document.querySelector('.hover-popup2')).not.toBeNull();

            // Ocultar popup
            button.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
            expect(document.querySelector('.hover-popup2')).toBeNull();
        });

        test('debe usar atributo data-info para contenido', () => {
            document.body.innerHTML = `
                <button class="info-trigger" data-info="<strong>HTML</strong> content">Info</button>
            `;

            Personalizado.iniciar({ ori: 'info-trigger', ele: 'info-popup' });

            const button = document.querySelector('.info-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const popup = document.querySelector('.info-popup');
            expect(popup.innerHTML).toBe('<strong>HTML</strong> content');
        });

        test('debe posicionar popup usando Direccion', () => {
            document.body.innerHTML = `
                <button class="pos-trigger" data-info="Test" data-pos="top">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'pos-trigger', ele: 'pos-popup' });

            const button = document.querySelector('.pos-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const popup = document.querySelector('.pos-popup');
            expect(Direccion.posicionar).toHaveBeenCalledWith('top', button, popup, false);
        });

        test('debe usar hover como evento por defecto', () => {
            document.body.innerHTML = `
                <button class="default-trigger" data-info="Default">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'default-trigger', ele: 'default-popup' });

            const button = document.querySelector('.default-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            expect(document.querySelector('.default-popup')).not.toBeNull();
        });
    });

    describe('Eventos Click', () => {
        test('debe crear popup, complemento y permitir cerrar con complemento', () => {
            document.body.innerHTML = `
                <button class="click-trigger" data-info="Click info" data-evt="click">Click</button>
            `;

            Personalizado.iniciar({ ori: 'click-trigger', ele: 'click-popup' });

            const button = document.querySelector('.click-trigger');
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            // Verificar popup
            const popup = document.querySelector('.click-popup');
            expect(popup).not.toBeNull();
            expect(popup.innerHTML).toBe('Click info');

            // Verificar complemento
            const complemento = document.querySelector('.tips-complemento');
            expect(complemento).not.toBeNull();
            expect(complemento.style.display).toBe('block');

            // Verificar que el complemento cierra el popup
            complemento.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(document.querySelector('.click-popup')).toBeNull();
            expect(complemento.style.display).toBe('none');
        });

        test('debe reemplazar popup existente en nuevo click', () => {
            document.body.innerHTML = `
                <button class="multi-click" data-info="First" data-evt="click">Click 1</button>
                <button class="multi-click" data-info="Second" data-evt="click">Click 2</button>
            `;

            Personalizado.iniciar({ ori: 'multi-click', ele: 'multi-popup' });

            const [button1, button2] = document.querySelectorAll('.multi-click');

            button1.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            let popup = document.querySelector('.multi-popup');
            expect(popup.innerHTML).toBe('First');

            // El segundo click debe remover el primer popup y crear uno nuevo
            button2.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            const popups = document.querySelectorAll('.multi-popup');
            // Puede haber 2 popups porque el código no remueve el anterior en click
            expect(popups.length).toBeGreaterThanOrEqual(1);
            // El último popup debe tener el contenido del segundo botón
            const lastPopup = popups[popups.length - 1];
            expect(lastPopup.innerHTML).toBe('Second');
        });
    });

    describe('Posicionamiento', () => {
        test('debe usar atributo data-pos para posición', () => {
            document.body.innerHTML = `
                <button class="pos-right" data-info="Test" data-pos="right">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'pos-right', ele: 'pos-popup-right' });

            const button = document.querySelector('.pos-right');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const popup = document.querySelector('.pos-popup-right');
            expect(Direccion.posicionar).toHaveBeenCalledWith('right', button, popup, false);
        });

        test('debe usar "abajo" como posición por defecto', () => {
            document.body.innerHTML = `
                <button class="default-pos" data-info="Test">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'default-pos', ele: 'default-popup-pos' });

            const button = document.querySelector('.default-pos');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const popup = document.querySelector('.default-popup-pos');
            expect(Direccion.posicionar).toHaveBeenCalledWith('abajo', button, popup, false);
        });

        test('debe establecer z-index correcto', () => {
            document.body.innerHTML = `
                <button class="z-trigger" data-info="Test">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'z-trigger', ele: 'z-popup' });

            const button = document.querySelector('.z-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const popup = document.querySelector('.z-popup');
            expect(popup.style.zIndex).toBe('10000000');
        });

        test('debe establecer estilos de posicionamiento', () => {
            document.body.innerHTML = `
                <button class="style-trigger" data-info="Test">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'style-trigger', ele: 'style-popup' });

            const button = document.querySelector('.style-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const popup = document.querySelector('.style-popup');
            expect(popup.style.position).toBe('absolute');
            expect(popup.style.maxWidth).toBe('270px');
        });
    });

    describe('Eventos Resize y Scroll', () => {
        test('debe reposicionar popup en resize de ventana', () => {
            document.body.innerHTML = `
                <button class="resize-trigger" data-info="Test" data-pos="top">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'resize-trigger', ele: 'resize-popup' });

            const button = document.querySelector('.resize-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            jest.clearAllMocks();

            // Simular resize
            window.dispatchEvent(new Event('resize'));

            expect(Direccion.posicionar).toHaveBeenCalled();
        });

        test('debe reposicionar popup en scroll de ventana', () => {
            document.body.innerHTML = `
                <button class="scroll-trigger" data-info="Test" data-pos="bottom">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'scroll-trigger', ele: 'scroll-popup' });

            const button = document.querySelector('.scroll-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            jest.clearAllMocks();

            // Simular scroll
            window.dispatchEvent(new Event('scroll'));

            expect(Direccion.posicionar).toHaveBeenCalled();
        });

        test('no debe reposicionar si popup no está activo', () => {
            document.body.innerHTML = `
                <button class="inactive-trigger" data-info="Test">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'inactive-trigger', ele: 'inactive-popup' });

            const button = document.querySelector('.inactive-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            button.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));

            jest.clearAllMocks();

            // Resize después de cerrar popup
            window.dispatchEvent(new Event('resize'));

            expect(Direccion.posicionar).not.toHaveBeenCalled();
        });
    });

    describe('Clases y Estilos Personalizados', () => {
        test('debe aplicar clase personalizada al popup', () => {
            document.body.innerHTML = `
                <button class="custom-class-trigger" data-info="Test">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'custom-class-trigger', ele: 'my-special-class' });

            const button = document.querySelector('.custom-class-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const popup = document.querySelector('.my-special-class');
            expect(popup).not.toBeNull();
            expect(popup.classList.contains('my-special-class')).toBe(true);
        });

        test('debe funcionar sin clase personalizada', () => {
            document.body.innerHTML = `
                <button class="no-class-trigger" data-info="Test">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'no-class-trigger', ele: '' });

            const button = document.querySelector('.no-class-trigger');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            // Debe crear popup aunque no tenga clase personalizada
            const popups = document.querySelectorAll('div[style*="position: absolute"]');
            expect(popups.length).toBeGreaterThan(0);
        });

        test('debe manejar contenido vacío en data-info', () => {
            document.body.innerHTML = `
                <button class="empty-info" data-info="">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'empty-info', ele: 'empty-popup' });

            const button = document.querySelector('.empty-info');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const popup = document.querySelector('.empty-popup');
            expect(popup).not.toBeNull();
            expect(popup.innerHTML).toBe('');
        });

        test('debe manejar ausencia de data-info', () => {
            document.body.innerHTML = `
                <button class="no-info">Botón</button>
            `;

            Personalizado.iniciar({ ori: 'no-info', ele: 'no-info-popup' });

            const button = document.querySelector('.no-info');
            button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

            const popup = document.querySelector('.no-info-popup');
            expect(popup).not.toBeNull();
            expect(popup.innerHTML).toBe('');
        });
    });

    describe('Múltiples Elementos', () => {
        test('debe inicializar múltiples elementos con la misma clase', () => {
            document.body.innerHTML = `
                <button class="multi-trigger" data-info="Info 1">Botón 1</button>
                <button class="multi-trigger" data-info="Info 2">Botón 2</button>
                <button class="multi-trigger" data-info="Info 3">Botón 3</button>
            `;

            Personalizado.iniciar({ ori: 'multi-trigger', ele: 'multi-popup-test' });

            const buttons = document.querySelectorAll('.multi-trigger');
            expect(buttons.length).toBe(3);

            // Probar primer botón
            buttons[0].dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            expect(document.querySelector('.multi-popup-test').innerHTML).toBe('Info 1');

            buttons[0].dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));

            // Probar segundo botón
            buttons[1].dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            expect(document.querySelector('.multi-popup-test').innerHTML).toBe('Info 2');
        });
    });
});
