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
						<div class="selected-area"></div>
						<div class="dividers-container">
							<div class="divider horizontal" v-for="n in 19"></div>
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
						<div class="filters">
							<div class="filters-control">
								<label>Name</label>
								<input type="text">
							</div>
							<div class="filters-control">
								<label>Contractor rating</label>
								<div class="double-input">
									<input type="text">
									<input type="text">
								</div>
							</div>
							<div class="filters-control">
								<div class="one-line">
									<label>Country</label>
									<p class="select-all">Select all</p>
								</div>
								<input type="text">
								<div class="filters-group">
									<div class="one-line" v-for="country in countries">
										<input type="checkbox">
										<label>{{ country }}</label>
									</div>
								</div>
							</div>
							<div class="filters-control">
								<label>Certification</label>
								<input type="checkbox">
								<input type="checkbox">
							</div>
							<div class="filters-control">
								<label>Verified</label>
								<input type="radio">
								<input type="radio">
							</div>
							<div class="filters-control">
								<div class="one-line">
									<input type="checkbox">
									<label>Verified by me</label>
								</div>
							</div>
							<button class="btn btn-yellow">Clear</button>
						</div>
					</div>
					<div class="circle circle-bottom">
						<img src="../../static/img/infinity.svg" alt="" width="12px" height="6px">
					</div>
				</div>
			</div>
			<div class="search-result">
				<div class="progress-list">
					<div class="progress-item" v-for="project in projects">
						<div class="row-top">
							<div class="title">{{ project.title }}</div>
							<div class="dropdown">
								<span>expand</span>
								<img src="../../static/img/expand-arrow.svg" alt="">
							</div>
						</div>
						<div class="circle logo">
							<span class="title">{{ project.projectLogo }}</span>
						</div>
						<div class="progress-bar" :class="project.status">
							<div class="progress-line"></div>
							<div class="dividers-container">
								<div class="divider" v-for="n in 21"></div>
							</div>
						</div>
						<div class="contractor-list" v-if="project.contractors">
							<div class="contractor-item" v-for="contractor in project.contractors">
								<div class="name">{{ contractor.title }}</div>
								<div class="contractor-circle circle">
									<img :src="contractor.logo" alt="">
								</div>
								<div class="contractor-info">
									<img src="../../static/img/star-off_small.svg" alt="" class="save">
									<div class="rating">
										<div class="block">
											<span>{{ contractor.rating }}</span>
											<div class="triangle"></div>
										</div>
									</div>
									<div class="header">
										<div style="min-width: 64px; min-height: 64px; background-color: #d5dbe1; margin-right: 16px"></div>
										<div class="content">
											<p class="title">
												{{ contractor.title }}
											</p>
											<p class="subtitle">
												{{ contractor.subtitle }}
											</p>
											<p class="date">
												In system since
												<br>
												{{ toFormatDate(contractor.date) }}
											</p>
										</div>
									</div>
									<div class="body">
										<div class="row">
											<p class="title">Web</p>
											<a href="#" class="link">{{ contractor.web }}</a>
										</div>
										<div class="row">
											<p class="title">GitHub</p>
											<a href="#" class="link">{{ contractor.git }}</a>
										</div>
										<div class="row">
											<p class="title">Projects</p>
											<p class="info">{{ contractor.projectsNum }}</p>
										</div>
										<div class="row">
											<p class="title">Avg. cost per week</p>
											<p class="info">{{ contractor.avgCost }} $</p>
										</div>
										<button class="btn btn-yellow">Chat</button>
									</div>
								</div>
							</div>
						</div>
						<div class="circle status" :class="'circle-' + project.status">
							<img :src="getStatusIcon(project.status)" alt="">
						</div>
						<div class="row-bottom">
							<div class="date">{{ toFormatDate(project.date) }}</div>
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
			projects: [
				{
					title: 'Untitled',
					date: 1524318238518,
					sum: 0,
					status: 'canceled',
					projectLogo: 'JB',
				},
				{
					title: 'AleExpress CryptoStore',
					date: 1524318238518,
					sum: 2000000,
					status: 'completed',
					projectLogo: 'JB',
				},
				{
					title: 'Virtual reality pluggin',
					date: 1524318238518,
					sum: 77822000,
					status: 'ongoing',
					projectLogo: 'JB',
					contractors: [
						{
							logo: '../../static/img/avatar@3x.png',
							title: 'Rift & Co',
							subtitle: 'Quality Assurance',
							date: 1524318238518,
							web: 'rift-qa.com',
							git: '/rift-qa',
							projectsNum: 9428,
							avgCost: 4000,
							rating: 9.2
						}
					]
				}
			],
			statusIcons: {
				canceled: '../../static/img/cross.svg',
				completed: '../../static/img/check.svg',
				ongoing: '../../static/img/infinity.svg'
			},
			countries: [
				'Afghanistan',
				'Albania',
				'Algeria',
				'American-Samoa',
				'Armenia'
			]
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
				margin-right 300px

				.filters
					width 208px
					border-radius 4px
					background-color #fafafa
					box-shadow 0 4px 16px 0 rgba(0, 0, 0, 0.24)
					position absolute 
					top 266px
					left 136px
					padding 16px

					.filters-control
						margin-bottom 24px
						width 100%

						.one-line
							display flex
							justify-content space-between

							.select-all
								font-family MuseoSansCyrl500
								font-size 12px
								opacity 0.5
								color #34343e
								text-align right
								margin 0

						.double-input
							display flex

							input:first-child
								margin-right 12px

						label 
							font-family MuseoSansCyrl500
							font-weight bold
							color #34343e
							margin-bottom 12px

						input 
							background-color #f7f7f7
							border-radius 2px
							border solid 1px #979797
							font-size 12px
							padding 6px 8px
							margin-top 12px
							color #34343e
							width 100%

				.vertical-progress
					display flex
					flex-direction column
					position relative

					.whole-line
						width 36px
						height 516px
						background-image linear-gradient(to bottom, #e7eaee, #bcc5d1)
						border 1px solid #d2dae2
						position relative

						.dividers-container
							flex-direction column

						.selected-area
							background-image linear-gradient(to bottom, #ffe082, #ffd24f)
							border solid 1px #ffd24f
							opacity 0.3
							height 312px
							position absolute 
							width 100%
							top 58px

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

			.search-result
				width 75%

				.progress-list
					width 100%

					.progress-item
						display flex
						flex-direction column
						position relative	

						.contractor-item
							position absolute
							top 28px
							left 43%

							.name
								width 100px
								display flex
								justify-content center
								position absolute
								top -25px
								left -32px
								font-family MuseoSansCyrl500
								font-size 16px
								color #2701b1

							.contractor-info
								width 224px
								height 282px
								border-radius 4px
								background-color #fafafa
								box-shadow 0 4px 16px 0 rgba(0, 0, 0, 0.24)
								padding 16px	
								position absolute
								top 52px
								left -94px

								.save
									position absolute
									top 16px
									right 16px

								.rating
									position absolute
									top 20px
									left 0

									.block
										width 23px
										height 16px
										background-image linear-gradient(to right, #ffe082, #ffd24f)
										position relative
										display flex
										justify-content center
										align-items center

										span 
											font-family MuseoSansCyrl500
											font-size 9px
											color #34343e

										.triangle
											position absolute
											top 0
											left 23px
											border 8px solid transparent
											border-left 7px solid #ffd24f

								p
									margin 0

								.header
									display flex
									margin-bottom 24px

									.content
										display flex
										flex-direction column
										justify-content space-between

										.title
											font-family MuseoSansCyrl500
											font-size 13px
											font-weight bold

										.subtitle
											font-family MuseoSansCyrl500
											font-size 12px
											color #34343e

										.date
											opacity 0.7
											font-family MuseoSansCyrl500
											font-size 12px
											font-weight 300
											color #34343e

								.body
									button 
										width 100%
										height 26px
										border-radius 2px
										margin 0
										font-size 12px

									.row
										display flex
										justify-content space-between

										p
											margin-bottom 16px

										.title
											font-family MuseoSansCyrl500
											font-size 12px
											font-weight 300
											color #34343e
											width 60%

										.link 
											width 40%
											text-align right
											color #a87104

										.info
											font-family MuseoSansCyrl500
											font-size 12px
											font-weight 500
											color #34343e
											width 40%
											text-align right										

						.row-top
							display flex
							justify-content space-between

							.title
								font-family MuseoSansCyrl500
								font-size 16px
								color #2701b1
								margin-bottom 10px

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
			bottom 136px

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

	.dividers-container
		display flex
		justify-content space-between
		align-items center
		height 100%
		width 100%
		position absolute
		top 0

		.divider
			width 2px
			height 32px
			opacity 0.6
			background-color #fff

			&.horizontal
				width 32px
				height 2px

</style>


