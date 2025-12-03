import Toast from '../src/modulos/Toast';

describe('Toast.js', () => {
    beforeEach(() => {
        // Limpiar DOM
        document.body.innerHTML = '';

        // Usar fake timers para controlar setTimeout
        jest.useFakeTimers();
    });

    afterEach(() => {
        // Limpiar toasts
        document.querySelectorAll('.toast').forEach(toast => toast.remove());

        // Restaurar timers
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    describe('Inicialización por Defecto', () => {
        test('debe crear toast con contenido HTML por defecto', () => {
            Toast.toast();

            const toast = document.querySelector('.toast');
            expect(toast).not.toBeNull();
            expect(toast.innerHTML).toContain('Hola Soy un Toast!!!');
        });

        test('debe añadir clase "toast" al elemento', () => {
            Toast.toast();

            const toast = document.querySelector('.toast');
            expect(toast.classList.contains('toast')).toBe(true);
        });

        test('debe añadir el toast al document.body', () => {
            Toast.toast();

            const toast = document.querySelector('.toast');
            expect(toast.parentElement).toBe(document.body);
        });

        test('debe establecer la posición top en 75px', () => {
            Toast.toast();

            const toast = document.querySelector('.toast');
            expect(toast.style.top).toBe('75px');
        });
    });

    describe('Contenido HTML Personalizado', () => {
        test('debe renderizar contenido HTML personalizado', () => {
            const customHtml = '<strong>Toast Personalizado</strong>';
            Toast.toast({ html: customHtml });

            const toast = document.querySelector('.toast');
            expect(toast.innerHTML).toContain(customHtml);
        });

        test('debe soportar estructuras HTML complejas', () => {
            const complexHtml = '<div class="header"><h3>Título</h3></div><p>Mensaje</p>';
            Toast.toast({ html: complexHtml });

            const toast = document.querySelector('.toast');
            expect(toast.querySelector('.header')).not.toBeNull();
            expect(toast.querySelector('h3')).not.toBeNull();
            expect(toast.querySelector('p')).not.toBeNull();
        });
    });

    describe('Clases Personalizadas', () => {
        test('debe aplicar una clase personalizada', () => {
            Toast.toast({ clases: ['custom-class'] });

            const toast = document.querySelector('.toast');
            expect(toast.classList.contains('custom-class')).toBe(true);
        });

        test('debe aplicar múltiples clases personalizadas', () => {
            Toast.toast({ clases: ['class1', 'class2', 'class3'] });

            const toast = document.querySelector('.toast');
            expect(toast.classList.contains('class1')).toBe(true);
            expect(toast.classList.contains('class2')).toBe(true);
            expect(toast.classList.contains('class3')).toBe(true);
        });

        test('debe mantener la clase base "toast"', () => {
            Toast.toast({ clases: ['custom-class'] });

            const toast = document.querySelector('.toast');
            expect(toast.classList.contains('toast')).toBe(true);
            expect(toast.classList.contains('custom-class')).toBe(true);
        });
    });

    describe('Funcionalidad del Botón de Cerrar', () => {
        test('debe crear botón de cerrar cuando cerrar=true', () => {
            Toast.toast({ cerrar: true });

            const closeBtn = document.querySelector('.cerrar');
            expect(closeBtn).not.toBeNull();
        });

        test('debe añadir clase "cerrar" al botón de cerrar', () => {
            Toast.toast({ cerrar: true });

            const closeBtn = document.querySelector('.cerrar');
            expect(closeBtn.classList.contains('cerrar')).toBe(true);
        });

        test('debe remover toast al hacer click en el botón de cerrar', () => {
            Toast.toast({ cerrar: true });

            const toast = document.querySelector('.toast');
            const closeBtn = document.querySelector('.cerrar');

            expect(toast).not.toBeNull();

            // Simular click
            closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            // Avanzar el timer de la transición
            jest.advanceTimersByTime(100);

            expect(document.querySelector('.toast')).toBeNull();
        });

        test('debe aplicar transición de fade-out al cerrar', () => {
            Toast.toast({ cerrar: true });

            const toast = document.querySelector('.toast');
            const closeBtn = document.querySelector('.cerrar');

            closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(toast.style.transition).toBe('opacity 0.1s');
            expect(toast.style.opacity).toBe('0');
        });

        test('no debe crear botón de cerrar cuando cerrar=false', () => {
            Toast.toast({ cerrar: false });

            const closeBtn = document.querySelector('.cerrar');
            expect(closeBtn).toBeNull();
        });
    });

    describe('Auto-remoción con Timer', () => {
        test('debe remover toast después del timeout por defecto (3000ms)', () => {
            Toast.toast();

            expect(document.querySelector('.toast')).not.toBeNull();

            // Avanzar tiempo
            jest.advanceTimersByTime(3000);

            expect(document.querySelector('.toast')).toBeNull();
        });

        test('debe remover toast después de timeout personalizado', () => {
            Toast.toast({ tiempo: 5000 });

            expect(document.querySelector('.toast')).not.toBeNull();

            // No debe removerse antes del tiempo
            jest.advanceTimersByTime(4999);
            expect(document.querySelector('.toast')).not.toBeNull();

            // Debe removerse después del tiempo
            jest.advanceTimersByTime(1);
            expect(document.querySelector('.toast')).toBeNull();
        });

        test('debe manejar remoción inmediata (tiempo=0)', () => {
            Toast.toast({ tiempo: 0 });

            expect(document.querySelector('.toast')).not.toBeNull();

            // Avanzar timers
            jest.advanceTimersByTime(0);

            expect(document.querySelector('.toast')).toBeNull();
        });

        test('debe remover toast con timeout largo', () => {
            Toast.toast({ tiempo: 10000 });

            expect(document.querySelector('.toast')).not.toBeNull();

            jest.advanceTimersByTime(10000);

            expect(document.querySelector('.toast')).toBeNull();
        });
    });

    describe('Reemplazo de Toast', () => {
        test('debe remover toast existente antes de crear uno nuevo', () => {
            // Crear primer toast
            Toast.toast({ html: 'Toast 1' });

            const firstToast = document.querySelector('.toast');
            expect(firstToast).not.toBeNull();
            expect(firstToast.innerHTML).toContain('Toast 1');

            // Crear segundo toast
            Toast.toast({ html: 'Toast 2' });

            const toasts = document.querySelectorAll('.toast');
            expect(toasts.length).toBe(1);
            expect(toasts[0].innerHTML).toContain('Toast 2');
        });

        test('debe tener solo un toast visible a la vez', () => {
            Toast.toast({ html: 'Toast 1' });
            Toast.toast({ html: 'Toast 2' });
            Toast.toast({ html: 'Toast 3' });

            const toasts = document.querySelectorAll('.toast');
            expect(toasts.length).toBe(1);
            expect(toasts[0].innerHTML).toContain('Toast 3');
        });
    });

    describe('Integración Completa', () => {
        test('debe crear toast con todas las opciones personalizadas', () => {
            Toast.toast({
                html: '<strong>Toast Completo</strong>',
                clases: ['success', 'large'],
                tiempo: 5000,
                cerrar: true
            });

            const toast = document.querySelector('.toast');
            expect(toast).not.toBeNull();
            expect(toast.innerHTML).toContain('<strong>Toast Completo</strong>');
            expect(toast.classList.contains('success')).toBe(true);
            expect(toast.classList.contains('large')).toBe(true);
            expect(toast.querySelector('.cerrar')).not.toBeNull();
            expect(toast.style.top).toBe('75px');
        });

        test('debe permitir cerrar manualmente antes del timeout', () => {
            Toast.toast({ tiempo: 10000, cerrar: true });

            const toast = document.querySelector('.toast');
            const closeBtn = document.querySelector('.cerrar');

            // Cerrar manualmente después de 1 segundo
            jest.advanceTimersByTime(1000);
            expect(document.querySelector('.toast')).not.toBeNull();

            closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            jest.advanceTimersByTime(100);

            expect(document.querySelector('.toast')).toBeNull();
        });
    });
});
