// Lib
const HordeCache = require('horde.cache');
const tickCache = new HordeCache.tickCache();

// Constants
const REGEN_INTERVAL = 300; // Taken from http://support.screeps.com/hc/en-us/articles/203079211-Source
const MAX_OPTIMAL_DIFF = 0.5;

/**
 * Returns true if the source has too many workers
 */
Source.prototype.aboveCapacity = tickCache.wrap(function aboveCapacity(){
  return !this.isOptimal() && !this.belowCapacity()
});

/**
 * Returns true if the source has too few workers
 */
Source.prototype.belowCapacity = tickCache.wrap(function belowCapacity(){
  const stats = this.stats();

  return !this.isOptimal() && stats.energyPerTick - stats.averageTargetEPT < 0;
});

/**
 * Returns true if the source does not need attention
 */
Source.prototype.isOptimal = tickCache.wrap(function belowCapacity(){
  const stats = this.stats();

  return (Math.abs(stats.energyPerTick - stats.averageTargetEPT) <= MAX_OPTIMAL_DIFF);
});

/**
 * Returns a snapshot of the source's current stats
 */
Source.prototype.stats = tickCache.wrap(function stats(){
  const {energy, energyCapacity, ticksToRegeneration} = this;
  const energyConsumed = energyCapacity - energy;
  const turnsSinceRegen = REGEN_INTERVAL - ticksToRegeneration;
  const energyPerTick = (energyConsumed / turnsSinceRegen).toFixed(2);
  const cycleTargetEPT = (energy / ticksToRegeneration).toFixed(2);

  return Object.assign({
    energy,
    energyCapacity,
    ticksToRegeneration,
    energyConsumed,
    turnsSinceRegen,
    energyPerTick,
    cycleTargetEPT
  }, this.longLivedStats_());
});

/**
 * Returns a snapshot of stats that do not change often
 * @private
 */
Source.prototype.longLivedStats_ = tickCache.wrap(function longLivedStats_(){
  const {energy, energyCapacity, ticksToRegeneration} = this;
  const sourceCache = HordeCache.fetchInstance(this);

  const averageTargetEPT = sourceCache.getValueOnce('averageTargetEPT', ()=>{
    return (energyCapacity / REGEN_INTERVAL).toFixed(2);
  });

  return {
    averageTargetEPT
  };
});
