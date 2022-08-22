const { createApp } = Vue;

createApp({
   data() {
      return {
         player_heal: 100,
         monster_heal: 100,
         game_is_on: false,
         game_logs: [],
      };
   },

   methods: {
      start_game: function () {
         this.game_is_on = true;
      },

      attack: function () {
         let point = Math.ceil(Math.random() * 10);

         this.monster_heal -= point;
         this.monster_attack();

         this.add_to_logs({
            turn: "Player",
            text: `Player Atağı ${point}`,
         });
      },

      spacial_attack: function () {
         let point = Math.ceil(Math.random() * 25);

         this.monster_heal -= point;
         this.monster_attack();

         this.add_to_logs({
            turn: "Player",
            text: `Special Attack ${point}`,
         });
      },

      heal_up: function () {
         let point = Math.ceil(Math.random() * 20);

         this.player_heal += point;
         this.monster_attack();

         this.add_to_logs({
            turn: "Player",
            text: `Heal ${point}`,
         });
      },

      give_up: function () {
         this.player_heal = 0;
      },

      monster_attack: function () {
         let point = Math.ceil(Math.random() * 15);

         this.player_heal -= point;

         this.add_to_logs({
            turn: "Monster",
            text: `Monster Atağı ${point}`,
         });
      },

      add_to_logs: function (log) {
         this.game_logs.push(log);
      },
   },

   watch: {
      player_heal: function (value) {
         if (value <= 0) {
            this.player_heal = 0;

            if (confirm("Oyuınu kaybettin. Tekrar denemek ister misin ?")) {
               this.player_heal = 100;
               this.monster_heal = 100;
               this.game_logs = [];
            }
         } else if (value >= 100) {
            this.player_heal = 100;
         }
      },

      monster_heal: function (value) {
         if (value <= 0) {
            this.monster_heal = 0;

            if (confirm("Oyuınu kazandın. Tekrar denemek ister misin ?")) {
               this.player_heal = 100;
               this.monster_heal = 100;
               this.game_logs = [];
            }
         }
      },
   },
}).mount("#app");
