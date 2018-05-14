<template>
	<div class="chat">
		<transition name="fade">
			<div class="chat-panel" v-if="isOpenChatPanel">
				<div class="panel-heading">
					<div class="panel-info">
						<img src="../../../static/img/avatar.svg" alt="" class="panel-picture" />
						<div class="panel-title">
							<h3 class="title">Tim Colleg</h3>
							<span class="subtitle">Quality Assurance</span>
						</div>
					</div>
					<div class="close-panel" @click="toggleChatPanel"></div>
				</div>

				<div class="panel-body" id="chat-panel">
					<div class="panel-messages">
						<p class="date">30 Mar</p>

						<div class="message" v-for="(message, messageIndex) in data" :class="{ 'message-sender': message.isMyMessage === true, 'message-receiver': message.isMyMessage !== true}">
							<img src="../../../static/img/avatar.svg" alt="" class="sender-avatar" v-if="message.isMyMessage" />
							<div class="data">
								<p class="text">{{ message.text }}</p>
								<div class="message-status">
									<div class="time">{{ message.time }}</div>
								</div>
							</div>
							<img src="../../../static/img/avatar.png" alt="" class="receiver-avatar" v-if="!message.isMyMessage" />
						</div>

					</div>
				</div>

				<div class="panel-footer">
					<div class="panel-form">
						<div class="form-message">
							<div class="file-upload">
								<label for="upload-file">
									<div class="attach-file"></div>
								</label>
								<input type="file" id="upload-file" @change="sendFile($event)">
							</div>
							<input type="text" class="input-panel" placeholder="Write a message..." @keyup.enter="sendMessage" v-model="messageText" />
						</div>
						<div class="send" @click="sendMessage"></div>
					</div>
				</div>
			</div>
		</transition>
		<div class="toggle-chat" @click="toggleChatPanel" :class="{ 'pulse-anime': isNewMessage === true}">
			<div class="chat-icon"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Chat',
	props: ['data'],
	data () {
		return {
			isOpenChatPanel: false,
			messageText: '',
			isNewMessage: false
		}
	},
	watch: {
		data: function (val) {
			if(!this.isOpenChatPanel) {
				this.isNewMessage = true;
			}
		}
	},
	methods: {
		sendFile (e) {
			return this.$parent.$emit('newMessageToChat', `Uploaded file - ${e.target.files[0].name}`);
		},
		toggleChatPanel () {
			if(!this.isOpenChatPanel) {
				this.isNewMessage = false;
			}
			this.isOpenChatPanel = !this.isOpenChatPanel;
		},
		sendMessage () {
			if(this.messageText.length === 0) {
				return false;
			} else {
				this.$parent.$emit('newMessageToChat', this.messageText);
				return this.messageText = '';
			}
		}
	}
}
</script>

<style>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter, .fade-leave-to{
		opacity: 0;
	}
</style>

<style lang="stylus" scoped>
	.chat
		position fixed
		z-index 5
		right 32px
		bottom 32px
		display flex
		align-items flex-end

		.toggle-chat
			width 48px
			height 48px
			background-color #b54efd
			border-radius 50%
			display flex
			justify-content center
			align-items center

			&.pulse-anime
				animation pulse 1s linear infinite

			.chat-icon
				width 24px
				height 24px
				background-image url('../../../static/img/chat-ic.svg')
				background-size contain
				background-repeat no-repeat



			@keyframes pulse
				0%
					transform: scale(1, 1)
				50%
					transform: scale(1.1, 1.1)
				100%
					transform: scale(1, 1)

			&:hover
				box-shadow 0 0 16px 0 rgba(0, 0, 0, 0.12), 0 2px 8px 0 rgba(0, 0, 0, 0.24)

		.chat-panel
			width 340px
			height 530px
			margin-right 18px
			border-radius 8px
			background-image linear-gradient(to right, #e9b2fe, #b54efd)
			box-shadow 0 0 16px 0 rgba(0, 0, 0, 0.12), 0 2px 8px 0 rgba(0, 0, 0, 0.24)

			.panel-heading
				width 100%
				height auto
				padding 12px
				display flex
				justify-content space-between

				.close-panel
					width 15px
					height 15px
					background-image url('../../../static/img/close-ic.svg')
					background-size contain
					background-repeat no-repeat

				.panel-info
					display flex

					.panel-picture
						width 48px
						height 48px

					.panel-title
						margin-left 18px

						.title
							margin 0
							font-family MuseoSansCyrl300
							font-size 21px
							font-weight bold
							line-height 1.29
							color #ffffff

						.subtitle
							opacity 0.8
							font-family: MuseoSansCyrl300
							font-size 15px
							font-weight 500
							color #ffffff

			.panel-body
				background-color #ffffff
				width 100%
				height calc(100% - 114px)
				display flex
				flex-direction column
				overflow-x scroll

				.panel-messages
					width 100%
					height 100%

					.date
						font-family MuseoSansCyrl500
						font-size 12px
						color #34343e
						margin 0
						padding 9px 12px
						text-align center

					.message
						margin 12px 12px 20px 12px
						display flex
						align-items flex-end
						justify-content flex-start

						.sender-avatar
							min-width 36px
							min-height 36px

						.data
							background-color rgba(139, 55, 255, 0.3)
							padding 4px 16px
							display flex
							align-items flex-end
							margin-left 8px
							border-radius 15px
							
							.text
								font-family MuseoSansCyrl300
								font-size 16px
								line-height 1.33
								color #34343e
								margin 0

							.message-status
								display flex
								margin-left 6px

								.time
									font-family MuseoSansCyrl300
									font-size 12px
									color #34343e

						/*&::before
							content url('../../../static/img/bubble.svg')
							position relative
							left -20px
							top 7px*/

						&.message-receiver
							justify-content flex-end

							.data
								margin-left 0
								margin-right 8px
								background-color rgba(168, 184, 200, 0.3)

								&::before
									content ''

							.receiver-avatar
								min-width 36px
								min-height 36px

			.panel-footer
				border-radius 0 0 8px 8px
				background-color #ffffff

				.panel-form
					display flex
					justify-content space-between
					padding 10px 12px
					border-top 2px solid #e5e9ed

					.form-message
						display flex
						align-items center

						#upload-file
							display none

						.attach-file
							width 18px
							height 19.5px
							background-image url('../../../static/img/attachments-ic.svg')
							background-repeat no-repeat
							background-size contain

						.input-panel
							opacity 0.5
							font-family: MuseoSansCyrl300
							font-size 16px
							font-weight 300
							color #34343e
							border none!important
							outline none
							margin-left 12px

					.send
						width 21px
						height 21px
						background-image url('../../../static/img/send-ic.svg')
						background-size contain
						background-repeat no-repeat

</style>