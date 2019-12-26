(function ($) {
    $.fn.disableSelection = function () {
        this.css('cursor', 'default');
        this.css('-webkit-touch-callout', 'none');
        this.css('-webkit-user-select', 'none');
        this.css('-khtml-user-select', 'none');
        this.css('-moz-user-select', 'none');
        this.css('-ms-user-select', 'none');
        this.css('user-select', 'none');
        return this.each(function () {
            if (typeof this.onselectstart != 'undefined') {
                this.onselectstart = function () {
                    return false;
                };
            } else if (typeof this.style.MozUserSelect != 'undefined') {
                this.style.MozUserSelect = 'none';
            } else {
                this.onmousedown = function () {
                    return false;
                };
            }
        });
    };
})(jQuery);

let Flake = class {
    color = "#B0E5FF";
    char = `❄️`;

    wind = 0;

    minXrange = -2;
    maxXrange = 2;

    minSpeed = 1.5;
    maxSpeed = 4;

    minSize = 18;
    maxSize = 40;

    WIDTH = 0;
    HEIGHT = 0;
    x = 0;
    y = 0;
    xrange = 0;
    yspeed = 0;
    life = 0;
    size = 0;
    html = null;

    constructor() {
        this.WIDTH = $(document).width();
        this.HEIGHT = $(document).height();
        this.spawn();
        console.log(this);

        this.html = document.createElement("span");
        $(this.html).css('position', 'absolute');
        $(this.html).css('fontSize', this.size + 'px');
        $(this.html).css('color', this.color);
        $(this.html).text(this.char);
        $(this.html).disableSelection();
    }

    spawn = () => {
        this.life = 0;

        this.xrange = Flake.random(this.minXrange, this.maxXrange);
        this.yspeed = Flake.random(this.minSpeed, this.maxSpeed);
        this.size = Flake.random(this.minSize, this.maxSize);

        this.x = Flake.random(0, this.WIDTH - this.size - 5);
        this.y = -this.maxSize;
    };

    render = () => {
        $(this.html).css('top', this.y + 'px');
        $(this.html).css('left', this.x + 'px');
    };

    animate = () => {
        this.y += this.yspeed;
        this.x += Math.sin(this.life) * this.xrange + this.wind;
        this.life += .005;
        if (this.x < this.maxSize || this.x >= this.WIDTH - this.maxSize - (this.size / 2)
            || this.y >= this.HEIGHT - this.maxSize - this.size) {
            this.spawn();
        }
        this.render();
    };

    get_html = () => {
        return this.html;
    };

    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
};

let Snow = class {
    flakes = [];

    constructor(nb) {
        this.frag = document.createDocumentFragment();

        for (let i = 0; i < nb; i++) {
            let flake = new Flake();
            this.frag.appendChild(flake.get_html());
            this.flakes.push(flake);
        }

        document.body.appendChild(this.frag);
    }

    animate = () => {
        for (let i = 0; i < this.flakes.length; i++) {
            this.flakes[i].animate();
        }
        setTimeout(this.animate, 20);
    };
};