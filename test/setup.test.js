describe('Jest Setup', () => {
    test('Jest está configurado correctamente', () => {
        expect(true).toBe(true);
    });

    test('DOM environment funciona', () => {
        document.body.innerHTML = '<div id="test"></div>';
        const el = document.getElementById('test');
        expect(el).not.toBeNull();
    });
});
