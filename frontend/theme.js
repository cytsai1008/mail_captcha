document.addEventListener('DOMContentLoaded', () => {
    const applyTheme = () => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    applyTheme();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
});
