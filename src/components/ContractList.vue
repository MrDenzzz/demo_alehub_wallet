<template>
  	<div class="contract-list">
		<navbar title="Contract List"
				:isNavigate="true"
				:isBalance="true"
				:rightMenu="rightMenu"/>
		<div class="row-page">
			<div class="sidebar">
				<div class="vertical-progress">
					<div class="circle circle-top">
						<span class="title">Start</span>
					</div>
					<div class="whole-line">
						<div class="marker-calendar marker-calendar-top">
							<div class="block">
								<img src="../../static/img/calendar-ic_black.svg" alt="" width="8px" height="8px">
								<span class="date">23.02.2018</span>
								<div class="triangle"></div>
							</div>
						</div>
						<div class="selected-area">
						</div>
						<button class="circle circle-big circle-yellow">
							<img src="../../static/img/ale-logo.svg" alt="" width="21px" height="25px">
						</button>
						<div class="marker-calendar marker-calendar-bottom">
							<div class="block">
								<img src="../../static/img/calendar-ic_black.svg" alt="" width="8px" height="8px">
								<span class="date">23.02.2018</span>
								<div class="triangle"></div>
							</div>
						</div>
						<div class="triangle"></div>
						<div class="search-types">
							<button class="circle circle-gray">
								<span class="title">TS</span>
							</button>
							<button class="circle circle-gray">
								<span class="title">TS</span>
								<span class="subtitle">EX</span>
							</button>
							<button class="circle circle-gray">
								<span class="title">CH</span>
							</button>
							<button class="circle circle-gray circle-active">
								<span class="title">QA</span>
							</button>
						</div>
					</div>
					<div class="circle circle-bottom">
						<img src="../../static/img/infinity.svg" alt="" width="12px" height="6px">
					</div>
				</div>
			</div>
			<div class="main-content">
				<div class="progress-list">
					<div class="progress-item" v-for="progressBar in progressBars">
						<div class="row-top">
							<div class="title">{{ progressBar.title }}</div>
							<div class="name">{{ progressBar.name }}</div>
							<div class="dropdown">
								<span>expand</span>
								<img src="../../static/img/expand-arrow.svg" alt="">
							</div>
						</div>
						<div class="circle logo">
							<span class="title">{{ progressBar.projectLogo }}</span>
						</div>
						<div class="progress-bar" :class="progressBar.status">
							<div class="progress-line"></div>
							<div class="dividers-container">
								<div class="divider" v-for="n in 21"></div>
							</div>
						</div>
						<div class="circle status" :class="'circle-' + progressBar.status">
							<img :src="getStatusIcon(progressBar.status)" alt="">
						</div>
						<div class="row-bottom">
							<div class="date">{{ toFormatDate(progressBar.date) }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  	</div>
</template>

<script>
import Navbar from './layouts/Navbar'

export default {
	name: 'ContractList',
	components: {
		Navbar
	},
	data() {
		return {
			progressBars: [
				{
					title: 'Untitled',
					name: 'Rift & Co',
					date: 1524318238518,
					sum: 0,
					status: 'canceled',
					projectLogo: 'JB'
				},
				{
					title: 'AleExpress CryptoStore',
					name: 'Rift & Co',
					date: 1524318238518,
					sum: 2000000,
					status: 'completed',
					projectLogo: 'JB'
				},
				{
					title: 'Virtual reality pluggin',
					name: 'Rift & Co',
					date: 1524318238518,
					sum: 77822000,
					status: 'ongoing',
					projectLogo: 'JB'
				}
			],
			statusIcons: {
				canceled: '../../static/img/cross.svg',
				completed: '../../static/img/check.svg',
				ongoing: '../../static/img/infinity.svg'
			}
		}
	},
	methods: {
		toFormatDate: function (date) {
            let dateFormat = new Date(date);
            return dateFormat.toDateString();
        },
		getStatusIcon(status) {
			if (status === 'canceled') {
				return this.statusIcons.canceled;
			} else if (status === 'completed') {
				return this.statusIcons.completed;
			} else {
				return this.statusIcons.ongoing;
			}
		}
	}
}
</script>

<style lang="stylus">
	.contract-list
		background-color #f0f4fa
		height 100vh

		.row-page
			padding-top 132px
			padding-right 48px
			padding-left 30px
			display flex

			.sidebar
				width 25%
				display flex 
				flex-direction column
				align-items center

				.vertical-progress
					display flex
					flex-direction column
					position relative

					.whole-line
						width 36px
						height 516px
						background-image linear-gradient(to bottom, #e7eaee, #bcc5d1)
						border 1px solid #d2dae2

						.selected-area
							background-image linear-gradient(to bottom, #ffe082, #ffd24f)
							border solid 1px #ffd24f
							opacity 0.3
							height 312px
							margin-top 54px

				.search-types
					display flex
					flex-direction column
					align-items center
					position absolute
					left 60px
					top 100px

					.circle
						position unset
						margin 8px

			.main-content
				width 75%

				.progress-list
					width 100%

					.progress-item
						display flex
						flex-direction column
						position relative

						.row-top
							display flex
							justify-content space-between

							.title
								font-family MuseoSansCyrl500
								font-size 16px
								color #2701b1
								margin-bottom 10px

							.name
								font-family MuseoSansCyrl500
								font-size 16px
								color #2701b1

							.dropdown
								opacity 0.5
								font-family MuseoSansCyrl500
								font-size 14px
								color #2701b1
								text-align right
								display flex
								align-items center

								img 
									padding-left 8px

						.progress-bar
							height 36px
							background-color #ffffff
							position relative

							.dividers-container
								display flex
								justify-content space-between
								align-items center
								height 36px
								position absolute
								width 100%
								top 0

								.divider
									width 2px
									height 32px
									opacity 0.6
									background-color #fff

							&.canceled
								background-image linear-gradient(to right, #f9f9fa, #eaedf0)

							&.completed
								background-image linear-gradient(to right, #eceef1, #bac4d0)

							&.ongoing
								background-image linear-gradient(to right, #f9f9fa, #eaedf0)

								.progress-line
									background-image linear-gradient(to right, #eceef1, #bac4d0)
									width 51%
									height 36px

						.row-bottom
							.date
								font-family MuseoSansCyrl500
								font-size 12px
								color #34343e
								margin-top 14px
								margin-bottom 22px

						.circle
							&.logo
								top 28px
								left -18px

							&.status
								right -18px
								top 29px

	.circle
		z-index 2
		position absolute
		width 36px
		height 36px
		background-image linear-gradient(to bottom, #525252, #222222)
		border-radius 50%
		display flex
		justify-content center
		align-items center
		flex-direction column
		border none

		&.circle-top
			top -18px

			.title
				font-size 8px
				font-weight bold

		&.circle-bottom
			bottom -18px

		&.circle-big
			width 48px
			height 48px
			top 178px
			left -6px

		&.circle-yellow
			background-image linear-gradient(to right, #ffe082,
			#ffd24f)
			box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.24)

		
		&.circle-gray
			background-image none
			background-color #aab7c7
			box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.24)

		&.circle-active
			background-image linear-gradient(to right, #b46dd0, #7e20c0)

		&.circle-canceled
			background-image linear-gradient(to right, #ff8282, #ff4f4f)

		&.circle-completed
			background-image linear-gradient(to right, #ffe082, #ffd24f)


		.title 
			font-family MuseoSansCyrl500
			color #fcfcfc
			font-size 16px
			text-transform uppercase
			line-height 1
			letter-spacing 1px
			color #fcfcfc
			text-shadow 0 0 2px rgba(0, 0, 0, 0.24)

		.subtitle
			font-family MuseoSansCyrl500
			color #fcfcfc
			font-size 9px
			text-transform uppercase
			text-shadow 0 0 2px rgba(0, 0, 0, 0.24)

	.marker-calendar
		position absolute

		&.marker-calendar-top
			left -80px
			top 46px

		&.marker-calendar-bottom
			left -80px
			bottom 140px

		.block
			width 66px
			height 16px
			background-image linear-gradient(to right, #ffe082, #ffd24f)
			position relative
			display flex
			justify-content space-around
			align-items center

			.triangle
				border 8px solid transparent
				border-left 8px solid #ffd24f
				top 0 
				left 66px

			.date
				font-family MuseoSansCyrl500
				font-size 9px
				font-weight 500
				text-align left 
				color #34343e

	.triangle
		width 0
		height 0
		border 6px solid transparent
		border-left 6px solid #aab7c7
		position absolute
		top 196px
		left 54px


</style>


