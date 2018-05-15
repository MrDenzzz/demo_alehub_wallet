<template>
  	<div class="contract-list">
		<navbar title="Contract List"
				:isNavigate="true"
				:isBalance="true"
				:rightMenu="rightMenu"/>
		<div class="info-header">
			<div class="info">
				Date range: 
				<span class="bold-text">{{ infoHeader.startDate}} - {{ infoHeader.finalDate }}</span>
			</div>
			<div class="info">
				Name:
				<span class="bold-text">{{ infoHeader.name }}</span> 
			</div>
			<div class="info">
				Rating:
				<span class="bold-text">{{ infoHeader.rating }}</span> 
			</div>
			<div class="info">
				Certification: 
				<span class="bold-text">{{ infoHeader.certification }}</span>
			</div>
			<div class="info">
				Verified: 
				<span class="bold-text">{{ infoHeader.verified }}</span>
			</div>
			<div class="bold-text">
				Verified by me
			</div>
		</div>
		<div class="row-page">
			<div class="sidebar">
				<div class="vertical-progress">
					<div class="circle circle-top">
						<div class="triangle"></div>
					</div>
					<div class="whole-line">
						<div class="marker-calendar marker-calendar-top">
							<div class="block">
								<img src="../../static/img/calendar-ic_black.svg" alt="" width="16px" height="16px">
								<div class="triangle"></div>
							</div>
						</div>
						<div class="selected-area"></div>
						<div class="dividers-container">
							<div class="divider horizontal" v-for="n in 8" :key="n"></div>
						</div>
						
						<button class="circle circle-big circle-yellow">
							<img src="../../static/img/ale-logo.svg" alt="" width="21px" height="25px">
						</button>
						<div class="marker-calendar marker-calendar-bottom">
							<div class="block">
								<img src="../../static/img/calendar-ic_black.svg" alt="" width="16px" height="16px">
								<div class="triangle"></div>
							</div>
						</div>
					</div>
					<div class="circle circle-bottom">
						<img src="../../static/img/infinity.svg" alt="" width="12px" height="6px">
					</div>
				</div>
			</div>
			<div class="search-result">
				<div class="progress-list">
					<div class="progress-item" v-for="project in projects" :key="project.id" :class="project.status">
						<div class="row-top">
							<div class="circle circle-big">
								<img src="#" alt="">
							</div>
							<div class="project-info">
								<p class="title">{{ project.title }}</p>
								<p class="subtitle">{{ project.company }}</p>
							</div>
							<div class="contractors-list">
								<div class="contractors-item" v-for="contractor in project.contractors" :key="contractor.id">
									<div class="contractors-content">
										<div class="circle" :class="checkContractorType(contractor.type)">
											<span class="initials">{{ contractor.initials }}</span>
										</div>
										<div class="contractors-info">
											<p class="title">{{ contractor.name }}</p>
											<p class="subtitle">{{ contractor.type }}</p>
										</div>
										<div v-for="key in contractor.keys" class="key-icon"  :key="key.id">
											<img :src="key" alt="">
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="progress-row">
							<img :src="getStatusIcon(project.status)" alt="" class="arrow">
							<div class="progress-bar" :class="project.status">
								<div class="step" v-for="n in project.steps" :key="n" :class="{'one-step': project.steps <= 1}">Month</div>
							</div>
						</div>
						<div class="row-bottom">
							<div class="date">{{ toFormatDate(project.startDate) }}</div>
							<div class="date">{{ toFormatDate(project.finalDate) }}</div>
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
					title: 'CryptoStore',
					company: 'Serokell',
					startDate: 1517495409000,
					finalDate: 1543588209000,
					status: 'ongoing',
					projectLogo: '../../static/img/ale-logo.svg',
					steps: 10,
					contractors: [
						{
							initials: 'VD',
							name: 'Vova Dmitrov',
							type: 'TS',
							keys: [
								'../../static/img/ts-key.svg'
							]
						},
						{
							initials: 'DV',
							name: 'Deus Virus',
							type: 'TS execution',
							keys: [
								'../../static/img/ts-exec-key.svg'
							]
						},
						{
							initials: 'NG',
							name: 'Nicola Glumac',
							type: 'Check',
							keys: [
								'../../static/img/check-key.svg',
								'../../static/img/check-key.svg'
							]
						},
						{
							initials: 'RC',
							name: 'Rift & Co',
							type: 'Quality Assurance',
							keys: [
								'../../static/img/qa-key.svg',
								'../../static/img/qa-key.svg'
							]
						}
					]
				},
				{
					title: 'Alehub',
					company: 'Effective Energy',
					startDate: 1523370609000,
					finalDate: 1543588209000,
					status: 'completed',
					steps: 8,
					contractors: [
						{
							initials: 'QB',
							name: 'Quality Boy',
							type: 'TS',
							keys: [
								'../../static/img/ts-key.svg'
							]
						},
						{
							initials: 'GA',
							name: 'Galvadon',
							type: 'TS execution',
							keys: [
								'../../static/img/ts-exec-key.svg'
							]
						},
						{
							initials: 'RC',
							name: 'Rift & Co',
							type: 'Quality Assurance',
							keys: [
								'../../static/img/qa-key.svg'
							]
						}
					]
				},
				{
					title: 'Virtual reality pluggin',
					company: 'Nike',
					startDate: 1525185009000,
					finalDate: 1525703409000,
					status: 'canceled',
					projectLogo: '../../static/img/ale-logo.svg',
					steps: 1,
					contractors: [
						{
							initials: 'RC',
							name: 'Rift & Co',
							type: 'Quality Assurance'
						}
					]
				}
			],
			statusIcons: {
				canceled: '../../static/img/arrow_canceled.svg',
				completed: '../../static/img/arrow_completed.svg',
				ongoing: '../../static/img/arrow_ongoing.svg'
			},
			infoHeader: {
				startDate: '23.02.2018',
				finalDate: '01.05.2018',
				name: 'Rift',
				rating: '2.5-9.8',
				certification: 'DIN',
				verified: "Doesn't matter"
			}
		}
	},
	methods: {
		toFormatDate: function (date) {
            let dateFormat = new Date(date);
            return dateFormat.toDateString();
        },
		getStatusIcon: function (status) {
			if (status === 'canceled') {
				return this.statusIcons.canceled;
			} else if (status === 'completed') {
				return this.statusIcons.completed;
			} else {
				return this.statusIcons.ongoing;
			}
		},
		checkContractorType: function (type) {
			switch (type) {
				case 'TS':
					return 'ts';
					break;
				case 'TS execution':
					return 'ts-exec';
					break;
				case 'Check':
					return 'check';
					break;
				default:
					return 'qa'
			}
		}
	}
}
</script>

<style lang="stylus">
	.contract-list
		background-color #f0f4fa
		height 100vh

		.info-header
			display flex
			padding 96px 110px 32px
			background-color #eceef1

			.info
				font-family MuseoSansCyrl300
				font-size 16px
				font-weight 300
				color #34343e
				margin-right 64px

			.bold-text
				font-family MuseoSansCyrl500
				font-weight bold

		.row-page
			padding-top 32px
			padding-right 68px
			padding-left 68px
			position relative

			.sidebar
				display flex 
				flex-direction column
				align-items center
				position absolute
				left 68px
				top 50px

				.vertical-progress
					display flex
					flex-direction column
					position relative

					.circle-top
						top -18px
						position absolute

						.triangle
							border 6px solid transparent
							border-top 6px solid #fcfcfc
							position absolute 
							top 17px

					.circle-bottom
						bottom -18px
						position absolute

					.whole-line
						width 36px
						height 508px
						background-image linear-gradient(to bottom, #e7eaee, #bcc5d1)
						border 1px solid #d2dae2
						position relative

						.marker-calendar-top
							left -48px
							top 42px

						.marker-calendar-bottom
							left -48px
							bottom 120px

						.circle-big
							top 172px
							left -6px
							position absolute

						.dividers-container
							flex-direction column

						.selected-area
							background-image linear-gradient(to bottom, #f0e5c2, #dfd1a2)
							border solid 1px #ffd24f
							height 312px
							position absolute 
							width 36px
							top 58px
							left -1px

			.search-result
				padding-left 136px

				.progress-list
					display flex
					flex-direction column
					align-items flex-start

					.progress-item
						display flex
						flex-direction column
						justify-content center
						position relative
						height 192px
						border 2px solid gray
						margin-bottom 24px
						padding 40px

						&.ongoing
							background-image linear-gradient(to right, #f0f4f4, #f0f3f2)
							border-style solid 
							border-width 2px
							-webkit-border-image linear-gradient(to right, #ffe082, #fed355) 1
							border-image linear-gradient(to right, #ffe082, #fed355) 1

						&.completed
							background-image linear-gradient(to right, #e8f4f5, #e7f3f2)
							border-style solid 
							border-width 2px
							-webkit-border-image linear-gradient(to right, #57de97, #2bd65c) 1
							border-image linear-gradient(to right, #57de97, #2bd65c) 1

						&.canceled
							background-image linear-gradient(to right, #f1eef4, #f0ecf2)
							border-style solid 
							border-width 2px
							-webkit-border-image linear-gradient(to right, #ff8282, #ff4f4f) 1
							border-image linear-gradient(to right, #ff8282, #ff4f4f) 1

						.progress-row
							display flex
							align-items center

							.arrow
								object-fit contain
								width 28px
								height 16px
								margin-left 10px
								margin-right 12px

							.progress-bar
								height 36px
								background-color #ffffff
								position relative
								background-image linear-gradient(to right, #eceef1, #bac4d0)
								border-radius 18px
								display flex
								align-items center

								.step
									width 118px
									height 32px
									border-right 2px solid #fff
									opacity 0.5
									font-family MuseoSansCyrl500
									font-size 16px
									color #fff
									display flex
									justify-content center
									align-items center

									&:last-child
										border-right none

									&.one-step
										min-width 480px

						.row-top
							display flex

							.project-info
								display flex
								flex-direction column
								margin-left 8px
								margin-right 140px
								
								.title
									margin 0
									font-family MuseoSansCyrl500
									font-size 16px
									color #34343e
									white-space nowrap

								.subtitle
									margin 0
									opacity 0.5
									font-family MuseoSansCyrl500
									font-size 12px
									color #34343e
									white-space nowrap

							.contractors-list
								display flex
								width 100%

								.contractors-item
									width 25%
									min-width 236px

								.contractors-content
									display flex
									position relative

									.key-icon
										z-index 3
										position absolute
										top 50px
										left -10px

										&:nth-child(4)
											left -300px

									.contractors-info
										margin-left 8px

									.circle
										opacity 0.5

										&.ts
											background-image linear-gradient(to right, #c07b44, #b63c2c)

										&.ts-exec
											background-image linear-gradient(to right, #0db79a, #0391a6)

										&.check
											background-image linear-gradient(to right, #ddc41c, #e09a00)
											
										&.qa
											background-image linear-gradient(to right, #b46dd0, #7e20c0)
											opacity 1

										.initials
											font-family MuseoSansCyrl500
											font-size 16px
											color #fcfcfc

									.title
										margin 0
										font-family MuseoSansCyrl500
										opacity 0.5
										font-size 16px
										color #34343e
										white-space nowrap

									.subtitle
										margin 0
										font-family MuseoSansCyrl500
										opacity 0.25
										font-size 12px
										color #34343e
										white-space nowrap

						.row-bottom
							display flex
							justify-content space-between
							padding-left 56px

							.date
								font-family MuseoSansCyrl500
								font-size 12px
								color #34343e
								margin-top 14px		

	.circle
		z-index 2
		width 36px
		min-width 36px
		height 36px
		background-image linear-gradient(to right, #525252, #222222)
		border-radius 50%
		display flex
		justify-content center
		align-items center
		flex-direction column
		border none

		&.circle-big
			width 48px
			height 48px
			min-width 48px
			min-height 48px


		&.circle-yellow
			background-image linear-gradient(to right, #ffe082,
			#ffd24f)
			box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.24)

		
		&.circle-gray
			background-image none
			background-color #aab7c7
			box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.24)

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

		.block
			width 32px
			height 32px
			background-image linear-gradient(to right, #ffe082, #ffd24f)
			position relative
			display flex
			justify-content space-around
			align-items center

			.triangle
				border 16px solid transparent
				border-left 8px solid #ffd24f
				position absolute
				top 0 
				left 32px

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

			&:first-child, &:last-child
				visibility hidden

</style>


