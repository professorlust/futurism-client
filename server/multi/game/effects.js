(function() {
	'use strict';

	var _ = require('lodash');


	/**
	 * Loop through every target and call iteratorFunc on
	 * the targets that have a card
	 * @param {[object]} targets
	 * @param {function} iteratorFunc
	 */
	var eachCard = function(targets, iteratorFunc) {
		_.each(targets, function(target) {
			if(target.card) {
				iteratorFunc(target.card);
			}
		});
	};


	module.exports = {


		/**
		 * Move all cards with life <= 0 to their owner's graveyard
		 * @param {[object]} targets
		 */
		death: function(targets) {
			_.each(targets, function(target) {
				if(target.card && target.card.health <= 0) {
					var card = target.card;
					card.health = 0;
					target.player.graveyard.push(card);
					target.card = null;
				}
			});
		},


		/**
		 * Apply poison damage to poisoned cards
		 * @param {[object]} targets
		 */
		poison: function(targets) {
			eachCard(targets, function(card) {
				if(card.poison > 0) {
					card.health -= card.poison;
				}
			});
		},


		/**
		 * End attack buffs, shields, and hero
		 * @param {[object]} targets
		 */
		deBuf: function(targets) {
			eachCard(targets, function(card) {
				card.attackBuf = 0;
				card.shield = 0;
				card.hero = 0;
			});
		},


		/**
		 * Give cards a movement point
		 * @param {[object]} targets
		 */
		refresh: function(targets) {
			eachCard(targets, function(card) {
				if(card.moves < 1) {
					card.moves++;
				}
			});
		}
	}
}());