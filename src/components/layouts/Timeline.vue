<template>
    <div class="timeline-block">
        <canvas id="timeline">Update your browser</canvas>
        <div class="marker-calendar start">
            <div class="block">
                <img src="../../../static/img/calendar-ic_black.svg" alt="" width="16px" height="16px">
                <div class="triangle"></div>
            </div>
        </div>
        <div class="marker-calendar final">
            <div class="block">
                <img src="../../../static/img/calendar-ic_black.svg" alt="" width="16px" height="16px">
                <div class="triangle"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Timeline',
    methods: {
        initTimeline: function () {
            let timeline = document.getElementById('timeline'),
                //мб попробовать разобраться с 3d и сделать в 3d?
                ctx = timeline.getContext('2d');

            let countHorInt = 10;
            let topX = 1000,
                botX = 1200;

            let fromY = 0,
                toY = 125;

            let diffInt = 200 / countHorInt; //1000 - 800
            let offset = topX / countHorInt;

            let countYInt = 4;
            let offsetY = 125 / 4;

            let cells = [];

            for (let i = 1; i < 11; i++) {
                for (let j = 0; j < 4; j++) {
                    cells.push(
                        {
                            lT: {
                                x: i * offset - (0.96 - 0.16 * i) * j * offsetY,
                                y: j * offsetY,
                            },
                            rB: {
                                x: (i + 1) * offset - (0.96 - 0.16 * (i + 1)) * (j + 1) * offsetY,
                                y: (j + 1) * offsetY,
                            },
                        }
                    );
                }
            }

            // console.log(cells, 'cells');

            timeline.width = 1200;
            timeline.height = 350;

            // ctx.fillStyle = '#dde3ea';
            // ctx.fillRect(0, 0, timeline.width, 200);

            ctx.beginPath();
            ctx.moveTo(100, 0);
            ctx.lineTo(0, 125);
            ctx.lineTo(1200, 125);
            ctx.lineTo(1100, 0);
            ctx.lineTo(100, 0);
            ctx.fillStyle = '#dde3ea';
            ctx.fill();
            ctx.closePath();


            //заполняем полоску первого подрядчика
            let start = 0,
                end = 400;

            ctx.beginPath();
            ctx.moveTo(100, 0);
            ctx.lineTo(400, 0);
            ctx.lineTo(400 - 0.32 * offsetY, offsetY);
            ctx.lineTo((-4 / 5) * (offsetY) + 100, offsetY);
            ctx.lineTo(100, 0);
            ctx.fillStyle = '#06dcd5';
            ctx.fill();
            ctx.closePath();


            ctx.beginPath();
            ctx.moveTo(400 - 0.32 * offsetY, offsetY);
            ctx.lineTo(800 + 0.32 * offsetY, offsetY);
            ctx.lineTo(800 + 0.32 * 2 * offsetY, 2 * offsetY);
            ctx.lineTo(400 - 0.32 * 2 * offsetY, 2 * offsetY);
            ctx.lineTo(400 - 0.32 * offsetY, offsetY);
            ctx.fillStyle = '#ff3d31';
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(600, 2 * offsetY);
            ctx.lineTo(900 + 0.48 * 2 * offsetY, 2 * offsetY);
            ctx.lineTo(900 + 0.48 * 3 * offsetY, 3 * offsetY);
            ctx.lineTo(600, 3 * offsetY);
            ctx.lineTo(600, 2 * offsetY);
            ctx.fillStyle = '#fab51d';
            ctx.fill();
            ctx.closePath();


            ctx.beginPath();
            ctx.moveTo(500 - 0.16 * 4 * offsetY, 3 * offsetY);
            ctx.lineTo(600, 3 * offsetY);
            ctx.lineTo(600, 4 * offsetY);
            ctx.lineTo(500 - 0.16 * 4 * offsetY, 4 * offsetY);
            ctx.lineTo(500 - 0.16 * 3 * offsetY, 3 * offsetY);
            ctx.fillStyle = '#8b37ff';
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(800 + 0.32 * 3 * offsetY, 3 * offsetY);
            ctx.lineTo(1100 + 0.8 * 3 * offsetY, 3 * offsetY);
            ctx.lineTo(1100 + 0.8 * 4 * offsetY, 4 * offsetY);
            ctx.lineTo(800 + 0.32 * 4 * offsetY, 4 * offsetY);
            ctx.lineTo(800 + 0.32 * 3 * offsetY, 3 * offsetY);
            ctx.fillStyle = '#8b37ff';
            ctx.fill();
            ctx.closePath();


            ctx.beginPath();
            for (let i = 2; i < countHorInt + 1; i++) {
                ctx.moveTo(i * offset, 0);
                ctx.lineTo(i * offset - offset + i * diffInt - diffInt, 125);
                ctx.strokeStyle = '#ffffff';
                ctx.stroke();
            }
            ctx.closePath();

            ctx.beginPath();
            for (let i = 1; i < countYInt; i++) {
                ctx.moveTo((-4 / 5) * (i * offsetY) + 100, i * offsetY);
                ctx.lineTo((4 / 5) * (i * offsetY) + 1100, i * offsetY);
                ctx.strokeStyle = '#ffffff';
                ctx.stroke();
            }
            ctx.closePath();

            ctx.fillStyle = '#ced5dd';
            ctx.fillRect(0, 125, timeline.width, 50);

            ctx.beginPath();
            for (let i = 1; i < countHorInt; i++) {
                ctx.moveTo(i * offset + i * diffInt, 125);
                ctx.lineTo(i * offset + i * diffInt, 175);
                ctx.strokeStyle = '#ffffff';
                ctx.stroke();
            }
            ctx.closePath();
        }
    },
    mounted() {
        this.initTimeline();

        document.getElementById('timeline').addEventListener('mouseover', function (e) {
            // console.log(e.clientX, 'e.clientX');
            // console.log(e.clientY, 'e.clientY');
        });

        document.getElementsByTagName('body')[0].addEventListener('mouseover', function (e) {
            // console.log(e.clientX, 'e.clientX');
            // console.log(e.clientY, 'e.clientY');
        });
    }
}
</script>

<style lang="stylus" scoped>
    .timeline-block
        width 100%
        display flex
        justify-content center
        padding 20px 50px
        position relative

        .marker-calendar
            &.start
                top 215px
                left 340px
            
            &.final
                top 215px
                right 940px

    .marker-calendar
        position absolute

        .block
            width 32px
            height 32px
            background-image linear-gradient(to bottom, #ffe082, #ffd24f)
            position relative
            display flex
            justify-content space-around
            align-items center

            .triangle
                border 16px solid transparent
                border-bottom 8px solid #ffe082
                position absolute
                top -24px
                left 0
</style>

