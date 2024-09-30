//эта сцена должна работать всегда. выкл только, когда игра окончена
class gameScene extends Phaser.Scene {

    constructor() {
        super({ key: "gameScene"});
        
    }

    preload() {
        //картинки для объектов
        this.load.image("box", "pic/box.png");
        this.load.image("fruit", "pic/banana.png");
        this.load.image("boy", "pic/boy.png");
        this.load.image("monkey", "pic/monkey.png");
    }

    create() {

        this.choice = 0; //выбор пользователя

        this.turn = 0; //чья очередь, 0 - пользователь, 1 - компьютер
        this.num_of_fruits = 0; //собранные фрукты
        this.fruit_a = 0; //нарисован ли новый фрукт

        this.my_fruits = 0; //фрукты, собранные пользователем
        this.monkey_fruits = 0; //фрукты, собранные компьютером

        //константы для управления кубами с клавиатуры, ключевые слова из библиотеки Phaser
        const { LEFT, RIGHT, ONE, TWO, THREE, FOUR, FIVE, ENTER, DOWN } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            enter: ENTER,
            down: DOWN,
            one: ONE,
            two: TWO,
            three: THREE,
            four: FOUR,
            five: FIVE
        });

        this.mas_num_user = [];
        //меню пользователя
        this.arr = new Array(Box);
        var k = 0.3;
        var x_box = 100;
        var y_box = this.game.config.height - 100;
        for (var i = 5; i > 0; i--) {
            this.box = new Box(
                this,
                x_box,
                y_box,
                "box"
            );
            this.box.setScale(k);
            this.box.set_Scale(k);
            this.arr.push(this.box);

            this.num = this.add.text(x_box, y_box, 6 - i, {
                fontFamily: 'monospace',
                fontSize: 30,
                fontStyle: 'bold',
                color: 'white',
                align: 'center'
            });
            this.num.setOrigin(0.5);


            y_box -= (this.game.config.height - this.game.config.height * 0.2) * k;
            k -= 0.05;           
        }

        this.mas_num_monkey = [];
        //меню компьютера
        this.comp = new Array(Box);
        var k = 0.3;
        var x_box = this.game.config.width - 100;
        var y_box = this.game.config.height - 100;
        for (var i = 5; i > 0; i--) {
            this.box = new Box(
                this,
                x_box,
                y_box,
                "box"
            );
            this.box.setScale(k);
            this.box.set_Scale(k);
            this.comp.push(this.box);
            y_box -= (this.game.config.height - this.game.config.height * 0.2) * k;
            k -= 0.05;

        }

        //массив размеров кубов для стратегии компьютера
        this.cubes_comp = [1, 2, 3, 4, 5];
        this.number_of_boxes_comp = 5;

        this.comp_choice = -1;

        //возможная высота фрукта
        this.fruit_height = [];
        this.t = 170;
        while(this.t != 430) {
            this.fruit_height.push(this.t);
            this.t += 10;

        }

        //высота персонажа (добавляется к высоте башни в итоге)
        this.anim_height = 150;
        this.boy = new Player(
            this,
            250,
            this.game.config.height - 100,
            "boy"
        );

        this.monkey = new Player(
            this,
            this.game.config.width - 250,
            this.game.config.height - 100,
            "monkey"
        );

        //имеющаяся высота
        this.have_height = 0;


        //появление фрукта
        this.need_win = this.fruit_appear();
        this.X = this.need_win[0];
        this.Y = this.fruit_height[Math.floor(Math.random() * 26)];
        this.fruit_a == 1;

        this.s = 0;
    }

    fruit_appear() {
        this.fruit = new Fruit(
            this,
            Phaser.Math.Between(420, this.game.config.width - 450),
            this.fruit_height[Math.floor(Math.random() * 26)],
            "fruit"
        );
        this.fruit.setScale(0.15);

        return [this.fruit.x, this.fruit.y];
    }

    strategy(mas, len) {
        var a = Math.floor(Math.random() * len);
        return a;
    }

    update() {

        this.f_user = this.add.text(30, 30, "YOUR FRUITS: " + this.my_fruits, {
            fontFamily: 'monospace',
            fontSize: 20,
            fontStyle: 'bold',
            color: '#DCF7BA',
            backgroundColor: '#228538',
            align: 'center'
        });

        this.f_comp = this.add.text(this.game.config.width - 220, 30, "MONKEY'S FRUITS: " + this.monkey_fruits, {
            fontFamily: 'monospace',
            fontSize: 20,
            fontStyle: 'bold',
            color: '#DCF7BA',
            backgroundColor: '#228538',
            align: 'center'
        });

        if ((this.my_fruits != 3) && (this.monkey_fruits != 3)) {
            if (this.fruit_a == 0) {

                this.boy.update();
                this.monkey.update();

                this.X = Phaser.Math.Between(420, this.game.config.width - 420);
                this.Y = this.fruit_height[Math.floor(Math.random() * 26)];
                this.fruit.x = this.X;
                this.fruit.y = this.Y;
                this.fruit_a = 1;

                this.boy.x = 250;
                this.boy.y = this.game.config.height - 100;

                this.monkey.x = this.game.config.width - 250;
                this.monkey.y = this.game.config.height - 100;

                var k = 0.1;
                    var x_box_c = this.game.config.width - 100;
                    var x_box_u = 100;
                    var y_box = 100;
                    for (var i = 5; i > 0; i--) {
                        this.comp[i].x = x_box_c;
                        this.comp[i].y = y_box;

                        this.arr[i].x = x_box_u;
                        this.arr[i].y = y_box;
                        this.arr[i].set_pos(false);
                        this.arr[i].set_f(0);

                        y_box += (this.game.config.height) * k;
                        k += 0.05;
                    }


                    this.have_height = 0;
                    this.cubes_comp = [1, 2, 3, 4, 5];
                    this.number_of_boxes_comp = 5;
                    this.choice = 0;
                    this.comp_choice = -1;
                    this.num_of_fruits += 1;
            }
            else if (this.fruit_a == 1){
                //обновление кубов на экране
                for (var i = 5; i > 0; i--) {
                    this.arr[i].update();
                    this.comp[i].update();
                }
                this.fruit.update();
                //очередь пользователя

                if (this.game.config.height - this.Y - this.have_height > this.anim_height) {
                    if (this.turn == 0) {
                        //Выбор пользователем кубика из меню: 5 - самый маленький, 1 - самый большой
                        if (this.choice == 0) {
                            if (this.keys.one.isDown)
                                this.choice = 1;
                            else if (this.keys.two.isDown)
                                this.choice = 2;
                            else if (this.keys.three.isDown)
                                this.choice = 3;
                            else if (this.keys.four.isDown)
                                this.choice = 4;
                            else if (this.keys.five.isDown)
                                this.choice = 5;
                        }
                        else if ((this.arr[this.choice].f == 0) && (this.choice != 0)) {
                            if ((this.arr[this.choice].position != true) && (this.choice != 0)) {
                                this.arr[this.choice].x = this.game.config.width / 2;
                                this.arr[this.choice].y = 100;
                                this.arr[this.choice].set_pos(true);
                            }
                            else if ((this.arr[this.choice].position == true)) {
                                //Передвижение выбранного кубика по экрану вправо и влево
                                if (this.keys.right.isDown) {
                                    this.arr[this.choice].moveRight();
                                }
                                else if (this.keys.left.isDown) {
                                    this.arr[this.choice].moveLeft();
                                }
                                if (this.keys.enter.isDown) {
                                    this.s = 1;

                                }
                            }
                            if (this.s == 1) {
                                
                                if (Math.abs(this.arr[this.choice].x - this.X) <= 50) {

                                    if (this.game.config.height - this.have_height - (this.arr[this.choice].get_height() / 2) - this.arr[this.choice].y > 10)
                                        this.arr[this.choice].y += 10;
                                    else {
                                        this.arr[this.choice].y = this.game.config.height - this.have_height - (this.arr[this.choice].get_height() / 2);
                                        this.arr[this.choice].set_f(1);
                                        
                                        this.have_height += this.arr[this.choice].get_height();
                                        this.choice = 0;
                                        
                                        this.s = 0;
                                        this.turn = 1;
                                    }
                                }
                                else {
                                    if (this.game.config.height - this.arr[this.choice].get_height() / 2 >= this.arr[this.choice].y)
                                        this.arr[this.choice].y += 10;
                                    else {
                                        alert('cube is too far from the center of the tower!');
                                        this.arr[this.choice].position = false;
                                        this.arr[this.choice].set_f(0);
                                        this.s = 0
                                    }
                                }
                            }
                        }
                        else if ((this.arr[this.choice].f != 0) && (this.choice != 0))
                            this.choice = 0;
                    }
                    else if (this.turn == 1) {
                        if (this.comp_choice == -1) {
                            this.comp_choice = this.strategy(this.cubes_comp, this.number_of_boxes_comp);
                            this.comp[this.cubes_comp[this.comp_choice]].y = 100;
                            this.comp[this.cubes_comp[this.comp_choice]].x = this.X;
                        }
                        if (this.comp_choice != -1) {
                            if (this.game.config.height - this.have_height - this.comp[this.cubes_comp[this.comp_choice]].get_height() / 2 - this.comp[this.cubes_comp[this.comp_choice]].y > 10)
                                this.comp[this.cubes_comp[this.comp_choice]].y += 10;
                            else {
                                this.comp[this.cubes_comp[this.comp_choice]].y = this.game.config.height - this.have_height - this.comp[this.cubes_comp[this.comp_choice]].get_height() / 2;
                                this.have_height += this.comp[this.cubes_comp[this.comp_choice]].get_height();
                                this.number_of_boxes_comp -= 1;
                                
                                this.cubes_comp.splice(this.comp_choice, 1);
                                this.comp_choice = -1;
                                this.turn = 0;
                            }
                        }
                    }
                }
                else {
                    
                    if ((this.turn == 1) && (this.fruit_a != -1)){
                        this.boy.x = this.X;
                        this.boy.y = this.game.config.height - this.have_height - 85;
                        setTimeout(() => this.fruit_a = 0, 1000);
                        this.my_fruits += 1;
                    }
                    else if ((this.turn == 0) && (this.fruit_a != -1)){
                        this.monkey.x = this.X;
                        this.monkey.y = this.game.config.height - this.have_height - 90;

                        setTimeout(() => this.fruit_a = 0, 1000);
                        this.monkey_fruits += 1;
                    }

                    if (this.turn == 0)
                        this.turn = 1;
                    else
                        this.turn = 0;

                    this.fruit_a = -1;
                    
                }
            }
            
        }
        else {
            if (this.my_fruits > this.monkey_fruits) {
                this.turn = 0;
            }
            else {
                this.turn = 1;
            }

            this.scene.start('endScene', { turn: this.turn });
        }
    }
}