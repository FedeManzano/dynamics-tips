import DropDown from '../src/modulos/DropDown';
import Direccion from '../src/modulos/posicionamineto/Direccion';

// Mock del módulo Direccion
jest.mock('../src/modulos/posicionamineto/Direccion', () => ({
    posicionar: jest.fn()
}));

describe('DropDown.js', () => {
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
            get() { return 40; }
        });
    });

    afterEach(() => {
        DropDown.destroy();
        jest.restoreAllMocks();
    });

    describe('Inicialización', () => {
        test('debe inicializar dropdowns y crear complemento', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle" data-target="#menu1">Toggle</button>
                <div id="menu1" class="dropdown">Menu Content</div>
            `;

            DropDown.iniciar();

            expect(document.querySelector('.drop-complemento')).not.toBeNull();
            expect(document.querySelector('.f-abajo')).not.toBeNull(); // Flecha creada
        });

        test('debe manejar elementos desactivados', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle desactivado" data-target="#menu1">Toggle</button>
            `;

            DropDown.iniciar();

            const flecha = document.querySelector('.f-abajo');
            expect(flecha).not.toBeNull();
            expect(flecha.style.borderTop).toContain('grey');
        });

        test('debe asignar evento click por defecto', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle" data-target="#menu1">Toggle</button>
                <div id="menu1" class="dropdown">Menu Content</div>
            `;

            DropDown.iniciar();

            const toggle = document.querySelector('.dropdown-toggle');
            const menu = document.querySelector('#menu1');

            toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(menu.style.display).toBe('block');
        });

        test('debe asignar evento hover si se especifica', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle" data-target="#menu1" data-evt="hover">Toggle</button>
                <div id="menu1" class="dropdown">Menu Content</div>
            `;

            DropDown.iniciar();

            const toggle = document.querySelector('.dropdown-toggle');
            const menu = document.querySelector('#menu1');

            toggle.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            expect(menu.style.display).toBe('block');
        });
    });

    describe('Interacción', () => {
        test('debe abrir y cerrar dropdown al hacer click en toggle', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle" data-target="#menu1">Toggle</button>
                <div id="menu1" class="dropdown">Menu Content</div>
            `;

            DropDown.iniciar();

            const toggle = document.querySelector('.dropdown-toggle');
            const menu = document.querySelector('#menu1');

            // Abrir
            toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(menu.style.display).toBe('block');
            expect(Direccion.posicionar).toHaveBeenCalled();

            // Cerrar
            toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(menu.style.display).toBe('none');
        });

        test('debe cerrar dropdown al hacer click en el complemento', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle" data-target="#menu1">Toggle</button>
                <div id="menu1" class="dropdown">Menu Content</div>
            `;

            DropDown.iniciar();

            const toggle = document.querySelector('.dropdown-toggle');
            const menu = document.querySelector('#menu1');
            const complemento = document.querySelector('.drop-complemento');

            // Abrir
            toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(menu.style.display).toBe('block');

            // Click en complemento
            complemento.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(menu.style.display).toBe('none');
            expect(complemento.style.display).toBe('none');
        });

        test('debe cerrar dropdown al hacer click en el menú', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle" data-target="#menu1">Toggle</button>
                <div id="menu1" class="dropdown">
                    <a href="#">Item</a>
                </div>
            `;

            DropDown.iniciar();

            const toggle = document.querySelector('.dropdown-toggle');
            const menu = document.querySelector('#menu1');

            // Abrir
            toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            // Click en menú
            menu.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(menu.style.display).toBe('none');
        });
    });

    describe('Posicionamiento', () => {
        test('debe llamar a posicionar con los parámetros correctos', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle" data-target="#menu1" data-pos="top">Toggle</button>
                <div id="menu1" class="dropdown">Menu Content</div>
            `;

            DropDown.iniciar();

            const toggle = document.querySelector('.dropdown-toggle');
            const menu = document.querySelector('#menu1');

            toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(Direccion.posicionar).toHaveBeenCalledWith('top', toggle, menu, false);
        });

        test('debe reposicionar al hacer resize si está abierto', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle" data-target="#menu1">Toggle</button>
                <div id="menu1" class="dropdown">Menu Content</div>
            `;

            DropDown.iniciar();

            const toggle = document.querySelector('.dropdown-toggle');

            // Abrir
            toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            jest.clearAllMocks();

            // Resize
            window.dispatchEvent(new Event('resize'));
            expect(Direccion.posicionar).toHaveBeenCalled();
        });

        test('NO debe reposicionar al hacer resize si está cerrado', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle" data-target="#menu1">Toggle</button>
                <div id="menu1" class="dropdown">Menu Content</div>
            `;

            DropDown.iniciar();

            // Resize sin abrir
            window.dispatchEvent(new Event('resize'));
            expect(Direccion.posicionar).not.toHaveBeenCalled();
        });
    });

    describe('Eventos Globales', () => {
        test('debe cerrar dropdown al hacer scroll', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle" data-target="#menu1">Toggle</button>
                <div id="menu1" class="dropdown">Menu Content</div>
            `;

            DropDown.iniciar();

            const toggle = document.querySelector('.dropdown-toggle');
            const menu = document.querySelector('#menu1');

            // Abrir
            toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(menu.style.display).toBe('block');

            // Scroll
            window.dispatchEvent(new Event('scroll'));
            expect(menu.style.display).toBe('none');
        });
    });

    describe('Destroy', () => {
        test('debe limpiar todo el estado y elementos creados', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle" data-target="#menu1">Toggle</button>
                <div id="menu1" class="dropdown">Menu Content</div>
            `;

            DropDown.iniciar();

            expect(document.querySelector('.drop-complemento')).not.toBeNull();
            expect(document.querySelector('.f-abajo')).not.toBeNull();

            DropDown.destroy();

            expect(document.querySelector('.drop-complemento')).toBeNull();
            expect(document.querySelector('.f-abajo')).toBeNull();
        });

        test('debe remover event listeners', () => {
            document.body.innerHTML = `
                <button class="dropdown-toggle" data-target="#menu1">Toggle</button>
                <div id="menu1" class="dropdown">Menu Content</div>
            `;

            DropDown.iniciar();
            const toggle = document.querySelector('.dropdown-toggle');
            const menu = document.querySelector('#menu1');

            DropDown.destroy();

            // Click no debe abrir el menú
            toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(menu.style.display).not.toBe('block');
        });
    });
});
