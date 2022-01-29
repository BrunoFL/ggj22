export class PointScoringSystem {

    static pointScoringSystem = [10, 6, 4, 3, 2, 1]

    /**
     * @param {number} position 
     * @param {boolean} finished 
     * @returns 
     */
    static pointsFor(position, finished) {
        if (position > pointScoringSystem.length || !finished) {
            return 0
        }
        return this.pointScoringSystem[position]
    }
}
