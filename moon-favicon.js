function setMoonFavicon() {
    // Referencia: luna nueva conocida — 6 enero 2000 18:14 UTC
    const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14));
    const synodicPeriod = 29.53059; // días

    const now = new Date();
    const diffMs = now - knownNewMoon;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const currentCycle = ((diffDays % synodicPeriod) + synodicPeriod) % synodicPeriod;

    // 8 fases dividiendo el ciclo en segmentos iguales (~3.69 días cada uno)
    const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    const index = Math.floor((currentCycle / synodicPeriod) * 8);
    const moonEmoji = phases[index];

    // Dibujar el emoji en un canvas y usarlo como favicon
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.font = '56px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(moonEmoji, 32, 36);

    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = canvas.toDataURL('image/png');
    document.head.appendChild(link);
}

setMoonFavicon();
