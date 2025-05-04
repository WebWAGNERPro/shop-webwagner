/**
 * Formate un nombre de ventes selon les règles suivantes :
 * - Nombres entre 0 et 100 : afficher tel quel (ex: "45")
 * - Nombres ronds (100, 1000, 10000) : afficher sans "+" (ex: "1k")
 * - Nombres entre 100 et 200 : afficher "100+"
 * - Nombres entre X00 et (X+1)00 : afficher "X,Yk+"
 *
 * @param sales - Le nombre de ventes à formater
 * @returns La chaîne formatée
 */
export function formatSales(sales: number): string {
    // Pour les nombres entre 0 et 100
    if (sales < 100) {
        return `${sales}`;
    }

    // Pour les nombres entre 100 et 1000
    if (sales < 1000) {
        // Vérifier si c'est un multiple de 100 exact
        if (sales % 100 === 0) {
            return `${sales}`;
        }

        // Pour les nombres entre 100 et 200
        if (sales < 200) {
            return "100+";
        }

        // Pour les autres nombres, arrondir à la centaine inférieure
        const hundreds = Math.floor(sales / 100) * 100;
        return `${hundreds}+`;
    }

    // Pour les nombres de 1000 et plus
    // Vérifier si c'est un multiple de 1000 exact
    if (sales % 1000 === 0) {
        return `${sales / 1000}k`;
    }

    // Pour les autres grands nombres
    const thousands = Math.floor(sales / 1000);
    const remainder = Math.floor((sales % 1000) / 100);

    if (remainder === 0) {
        return `${thousands}k+`;
    } else {
        return `${thousands},${remainder}k+`;
    }
}
