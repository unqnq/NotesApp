document.addEventListener('DOMContentLoaded', () => 
{
    let savedTheme = localStorage.getItem('theme');
    if (savedTheme === null)
    {
        savedTheme = 'light';
    }
    applyTheme(savedTheme);
    populateThemeSelector(savedTheme);
});
    
function applyTheme(theme)
{
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeSelector(theme);
}
    
function updateThemeSelector(theme)
{
    const select = document.getElementById('themeSelector');
    if (select)
    {
        select.value = theme;
    }
}

function populateThemeSelector(selectedTheme)
{
    const select = document.getElementById('themeSelector');
    if (!select) 
    {
        return;
    }
    
    const themes = 
    [
        { name: 'light', color: '#ffffff', text: '#000000' },
        { name: 'dark', color: '#121212', text: '#e0e0e0' },
        { name: 'blue', color: '#007BFF', text: '#ffffff' },
        { name: 'pink', color: '#FF69B4', text: '#ffffff' },
        { name: 'yellow', color: '#FFD700', text: '#000000' },
        { name: 'orange', color: '#FF8C00', text: '#ffffff' },
        { name: 'purple', color: '#800080', text: '#ffffff' },
        { name: 'green', color: '#28a745', text: '#ffffff' },
        { name: 'red', color: '#dc3545', text: '#ffffff' },
        { name: 'cyan', color: '#17a2b8', text: '#ffffff' }
    ];
    
    select.innerHTML = '';
    
    themes.forEach(theme => 
    {
        const option = document.createElement('option');
        option.value = theme.name;
        option.textContent = theme.name.toUpperCase();
    
        option.style.backgroundColor = theme.color;
        option.style.color = theme.text;
    
        if (theme.name === selectedTheme)
        {
            option.selected = true;
        }
    
        select.appendChild(option);
    });
    
    select.addEventListener('change', (e) => 
    {
        changeTheme(e.target.value);
    });
}
    
function changeTheme(theme)
{
    switch (theme)
    {
        case 'dark':
            applyTheme('dark');
            break;
        case 'light':
            applyTheme('light');
            break;
        case 'blue':
            applyTheme('blue');
            break;
        case 'pink':
            applyTheme('pink');
            break;
        case 'yellow':
            applyTheme('yellow');
            break;
        case 'orange':
            applyTheme('orange');
            break;
        case 'purple':
             applyTheme('purple');
            break;
        case 'green':
             applyTheme('green');
             break;
        case 'red':
             applyTheme('red');
            break;
        case 'cyan':
            applyTheme('cyan');
             break;
        default:
            applyTheme('light');
    }
}
    