const messages = {
    eng: {
        pages: {
            login: {
                password: 'Password',
                login: 'Login',
                textForgotPassword: 'Forgot your email or password?',
                recoverAccount: 'Recover account.',
                textHaveAccount: 'Don’t have an account?',
                createAccount: 'Create one.'
            },
            registration: {
                form: {
                    name: {
                       label: 'full name',
                       placeholder: 'enter full name'
                    },
                    email: {
                        label: 'e-mail',
                        placeholder: 'enter e-mail'
                    },
                    password: {
                        label: 'password',
                        placeholder: 'enter password'
                    },
                    repeatPassword: {
                        label: 'Repeat Password',
                        placeholder: 'enter repeat password'
                    }
                },
                toast: {
                    error: {
                        name: 'Enter correct name',
                        email: 'Enter correct email',
                        password: 'The password must be between 8 and 100 characters long, have uppercase letters, lowercase letters, numbers',
                        repeatPassword: 'The entered password do not match'
                    }
                },
                create: 'Create',
                haveAccount: 'Already have an account?',
                login: 'Log in.',
                completionRegistration: 'To complete the registration, please follow the link on your mail'
            },
            notifications: {
                edit: 'Edit',
                navbarTitle: 'Notifications feed',
                notFound: 'No notifications found',
                today: 'today',
                yesterday: 'yesterday',
                in: 'in',
                youSend: 'You **send**',
                youReceive: 'You **receive**',
                toAddress: 'to address',
                fromAddress: 'from address',
                selectAll: 'Select All'
            },
            settings: {
                navbarTitle: 'Settings',
                panelHeadingGeneral: 'General',
                fullName: 'Full name',
                password: 'Password',
                passwordLabel: {
                    first: "Last password change was",
                    second: "day's ago"
                },
                language: 'Language',
                logout: 'Log out',
                security: 'Security',
                theme: 'Select theme',
                _2fa: 'Two-factor authentification',
                _2faText: 'You can add a second layer of protection with 2-Step Verification, switch requires a single-use code sent to your phone or using third-party authentification app.'
            },
            summary: {
                navbarTitle: 'Summary',
                notFound: 'No transactions found',
                buttons: {
                    send: 'Send',
                    request: 'Request',
                    reset: 'Reset filter'
                },
                panelHeadings: {
                    recent: 'Recent activity'
                },
                rightMenu: {
                    summary: 'Summary',
                    walletOffers: 'Wallet offers',
                    send: 'Send',
                    transactions: 'Transactions',
                    walletSettings: 'Wallet settings'
                },
                searchPanel: {
                    search: 'Search Transactions...',
                    dateRange: 'Select a date range',
                    langDate: "en",
                    buttons: {
                        download: 'Download PDF',
                        share: 'Share'
                    },
                    info: {
                        received: 'Received',
                        sent: 'Sent',
                        starting: 'Starting',
                        total: 'Total'
                    }
                },
                activityList: {
                    today: 'Today',
                    yesterday: 'Yesterday',
                    from: 'From:',
                    to: 'To:',
                    purpose: 'Purpose transaction',
                    status: {
                        sent: 'Sent',
                        recieved: 'Recieved'
                    },
                    resultDay: {
                        received: 'Received',
                        sent: 'Sent',
                        total: 'Total'
                    }
                }
            },
            walletsList: {
                search: 'Search wallet...',
                addNew: 'Add a new wallet'
            },
            jobOffers: {
                navbarTitle: 'Job Offers',
                amountOffers: 'offers',
                notFoundOffersByFilter: 'No offers match your filters',
                filters: {
                    onPage: 'offers on page',
                    sortBy: {
                        title: 'sort by'
                    }
                },
                filtersBlock: {
                    title: 'Filters',
                    price: {
                        title: 'Contractor price',
                        from: 'from',
                        to: 'to'
                    },
                    type: {
                        title: 'Type'
                    },
                    contractor: {
                        title: 'Contractor rating',
                        from: 'from',
                        to: 'to'
                    },
                    profArea: {
                        title: 'Professional area',
                    },
                    duration: {
                        title: 'Project duration'
                    }
                },
                newOfferBlock: {
                    title: 'You are an employer? ',
                    subTitle: 'Create your own task'
                },
                rightMenu: {
                    savedOffers: 'Saved offers',
                    createOffer: 'Create offer'
                }
            },
            singleOffer: {
                requirements: 'Requirements',
                deadline: 'ends in',
                parseEnd: {
                    single: 'Day',
                    more: "Day's"
                }
            },
            jobOffer: {
                navbarTitle: 'Job Offer',
                fields: {
                    description: 'Description',
                    requirements: 'Requirements',
                    deadline: {
                        title: 'Deadline'
                    }
                }
            },
            walletSettings: {
                navbarTitle: 'Wallet settings',
                fields: {
                    name: {
                        walletName: 'Wallet name'
                    },
                    spendingPass: {
                        label: 'Spending password',
                        text: 'Turn on spending password to approve your transactions'
                    },
                    deleteWallet: 'Delete wallet',
                }
            },
            walletOffers: {
                navbarTitle: 'Portfolio',
                hideComplete: 'Hide completed tasks',
                portfolios: {
                    title: 'Potrfolio',
                    empty: {
                        title: 'You portfolio is empty',
                        btntext: 'Look for a task'
                    },
                    noTasks: {
                        title: 'You seem to have no work in progress',
                        btntext: 'Find a new task'
                    }
                },
                offers: {
                    title: 'Your offers',
                    empty: {
                        title: 'You are an employer?',
                        btntext: 'Create your own task'
                    },
                    noTasks: {
                        title: 'All your offers are completed',
                        btntext: 'Create a new one'
                    }
                }
            },
            newOffer: {
                navbarTitle: 'Create new offer',
                panelHeadings: {
                    generel: 'General info',
                    specification: 'Specification',
                    actions: 'Actions'
                },
                fields: {
                    uploadFile: {
                        title: 'Upload your specification file here',
                        btntext: 'Choose file...'
                    },
                    name: {
                        label: 'Offer name',
                        placeholder: 'Type offer name here'
                    },
                    price: {
                        label: 'Price, alc',
                        placeholder: 'Set your price'
                    },
                    description: {
                        label: 'description',
                        placeholder: 'Type your description here. You can stylize text only by using *bold* and _italic_ modificators'
                    },
                    requirements: {
                        label: 'Requirements',
                        placeholder: 'Add skills and requirements'
                    },
                    deadline: {
                        label: 'DeadLine',
                        placeholder: 'Select Date'
                    }
                },
                buttons: {
                    upload: 'Upload',
                    publish: 'Publish offer'
                }
            }
        },
        modals: {
            newWallet: {
                new: {
                    label: 'Create new wallet',
                    fields: {
                        title: {
                            label: 'Wallet name',
                            placeholder: 'Wallet name'
                        }
                    },
                    button: 'Create'
                },
                import: {
                    label: 'Import',
                    button: 'Redeem',
                    fields: {
                        title: {
                            label: 'Wallet name',
                            placeholder: 'Wallet name'
                        },
                        mnemonic: {
                            label: 'Mnemonic phrase',
                            placeholder: 'Mnemonic phrase'
                        }
                    }
                },
                redeem: {
                    label: 'Redemption',
                    button: 'Redeem',
                    fields: {
                        title: {
                            label: 'Wallet name',
                            placeholder: 'Redemption wallet'
                        },
                        key: {
                            label: 'Redemption key',
                            placeholder: 'Redemption key'
                        },
                        decrypt: {
                            label: 'Phrase to restore your wallet'
                        }
                    }
                },
                recovery: {
                    phrase: {
                        title: 'Recovery phrase',
                        text: 'On the following screen, you will see a set of X random words. This is your wallet backup phrase. It can be entered in any version of ALE application in order to back up or restore your wallet’s funds and private key.',
                        checkbox: 'Make sure nobody looks into your screen unless you want them to have access to your funds.',
                        btn: 'Continue'
                    },
                    mnemonic: {
                        text: 'Please, make sure you have carefully writen down your recovery phrase somewhere safe. You will need this phrase later for next use and recover. Phrase is case sensitive.',
                        btnCopy: 'Copy mnemonic',
                        btn: 'Yes, I’ve written it down',
                        toastedSuccessMnemonic: 'The mnemonic phrase was copied successfully'
                    },
                    finish: {
                        each: 'Type each word in the correct order to verify your recovery phrase',
                        fields: {
                            phrase: {
                                title: 'Recovery phrase',
                                placeholder: 'type your recovery phrase here'
                            },
                            deviceOnly: 'I understand that my money are held securely on this device only, not on the company servers',
                            secure: 'I understand that if this application is moved to another device or deleted, my money can be only recovered with the backup phrase which were written down in a secure place'
                        },
                        btn: {
                            clear: 'Clear',
                            confirm: 'Confirm'
                        }
                    }
                }
            },
            send: {
                title: 'Send',
                amount: 'Amount',
                max: 'use max',
                address: 'Address',
                addressPlaceholder: 'Enter the name of the cryptographic wallet',
                total: 'Total',
                sendText: 'You are sending',
                to: 'to',
                footerModal: 'Sending was successful',
                buttons: {
                    next: 'Next',
                    send: 'Send'
                }
            },
            request: {
                title: 'request',
                receiver: 'Receiver address',
                qrShare: 'Share this QR code to receive payments',
                button: 'Copy'
            },
            deleteWallet: {
                title: 'Delete wallet',
                confirm: {
                    titleStart: 'Do you really want to delete',
                    titleEnd: 'wallet?',
                    subtitle: 'Make sure you have access to backup before continue. Otherwise you will lose all your funds connected to this wallet.'
                },
                fields: {
                    walletName: {
                        label: 'Type wallet name to confirm deletion',
                        placeholder: 'wallet name'
                    }
                },
                buttons: {
                    cancel: 'Cancel',
                    delete: 'Delete'
                }
            },
            changeTwoAuth: {
                title: {
                    enable: 'Enable TWO AUTH',
                    disable: 'Disable TWO AUTH'
                },
                warning: 'Save this secret code to safe place',
                buttons: {
                    enable: 'Enable',
                    disable: 'Disable',
                    copy: 'Copy secret key'
                },
                fields: {
                    secret: {
                        label: 'Secret key',
                        placeholder: 'Enter your secret key'
                    },
                    _2fa: {
                        label: '2fa key',
                        placeholder: 'Enter your 2fa key'
                    }
                }
            },
            changePassword: {
                title: 'Изменить пароль',
                fields: {
                    _2fa: {
                        label: '2fa key',
                        placeholder: 'Enter 2fa key'
                    },
                    oldPass: {
                        label: 'Old password',
                        placeholder: 'Old password'
                    },
                    newPass: {
                        label: 'New password',
                        placeholder: 'New password'
                    },
                    confirmPass: {
                        label: 'Repeat password',
                        placeholder: 'Confirm new password'
                    }
                },
                buttons: {
                    change: 'Change'
                }
            },
            changeEmail: {
                title: 'Change email',
                fields: {
                    _2fa: {
                        label: '2fa key',
                        placeholder: 'Enter 2fa code'
                    },
                    newEmail: {
                        label: 'Email',
                        placeholder: 'Enter new email'
                    },
                },
                buttons: {
                    change: 'Change'
                }
            },
            share: {
                title: 'Share',
                label: 'Add your comment',
                placeholder: 'Write your comment here'
            },
            pdf: {
                title: 'EXPORT TO PDF',
                firstDesc: 'Select from where you want to export transactions',
                firstRadio: {
                    first: 'Current wallet transactions',
                    second: 'All wallets transactions',
                    third: 'Custom',
                },
                secondDesc: 'Select wallets from where you want to export transactions',
                selectAll: 'select all',
                tags: 'Tag\'s',
                thirdDesc: 'Type a tag here to choose specific transactions (optional)',
                TransactionsType: 'Transaction\'s type',
                secondRadio: {
                    first: 'Income',
                    second: 'Outcome',
                    third: 'All',
                },
                range: 'Transaction\'s amount range',
                from: 'from',
                to: 'to',
                button: {
                    reset: 'Reset filters',
                    export1: "Export",
                    export2: "transactions"
                },
                lang: 'en'
            },
            error: {
                moreThanZero: 'Transaction amount must be greater than 0',
                moreThanHave: 'You can not send more coins than there are in your account',
                toYourself: 'You can not send tokens to yourself',
                sendFail: 'Sending failed',
                wrongMail: 'You are sent to me wrong email data',
                lenght2faCheck: 'The 2fa code length must be 6 digits',
                projectData: 'You are submitting incorrect project data',
                differentPass: 'New password and confirmed password do not match',
                lengthPass: 'The password must be at least 8 characters in length',
                changeAddr: 'You have failed confirm the email address change',
                cancelChangeAddr: 'You have failed canceled the email address change',
                logout: 'An error occurred while logout',
                changeNameWallet: 'There was an error changing your wallet name',
                setAvatar: 'Photo not uploaded',
                checkOffer: "Fill out the OFFER NAME field",
                checkPrice: "Fill out the PRICE field",
                checkPriceZero: "You can not set the value of the PRICE field to zero",
                checkDesc: "Fill out the DESCRIPTION field",
                checkRequirements: "Fill out the REQUIREMENTS field",
                checkDeadline: "Fill out the DEADLINE field",
                checkUpload: "You should select the UPLOAD file",
                checkUploadButton: "You should click the UPLOAD file button",
                checkSolution: "Upload your SOLUTION before SUBMIT",
                walletRedeem: 'Wallet was failed redeem',
                disable2fa: 'You have failed DISABLE dual authentication',
                enable2fa: 'You have failed ENABLE dual authentication',
                walletDelete: 'There was an error deleting the wallet',
                changePassword: {
                    first: "You cannot change",
                    second: "without enabling two factor authentication"
                }
            },
            success: {
                changeMail: 'Confirmation of the change of email was sent to this address',
                changePass: 'You have successfully changed your password',
                changeName: 'Your name has been successfully changed',
                setAvatar: 'Photo successfully uploaded',
                newWallet: {
                    wallet: "Wallet",
                    create: "successful created!",
                    delete: "successful deleted!"
                },
                copyWallet: 'You have successfully copied the address of the wallet',
                changeAddr: 'You have successfully confirm the email address change',
                cancelChangeAddr: 'You have successfully canceled the email address change',
                changeNameWallet: 'The name of the wallet was successfully changed',
                checkUpload: "Selected file was successfully uploaded",
                saveOffer: "Offer saved",
                removeOffer: "Offer was removed from saved",
                copySecretCode: 'You have successfully copied the secret code',
                disable2fa: 'You have successfully DISABLED dual authentication',
                enable2fa: 'You have successfully ENABLED dual authentication',
            },
            lang: {
                submit: "Submit",
                title: "Select language"

            }
        },
        navbar: {
            wallet: 'Wallet',
            offers: 'Offers',
            resume: 'Resumes',
            notifications: 'Notifications',
            settings: 'Settings'
        },
        stateBar: {
            timeInterval: 'Contract period',
            name: 'Name',
            rating: 'Rating',
            price: 'Price',
            certification: 'Certification',
            verified: 'Verified'
        },
        offersFilter: {
            name: {
                title: 'Name'
            },
            rating: {
                title: 'Contractor rating',
                from: 'from',
                to: 'to'
            },
            price: {
                title: 'Contractor price',
                from: 'from',
                to: 'to'
            },
            country: {
                title: 'Country',
                selectAll: 'Select all'
            },
            certification: {
                title: 'Certification',
                options: [
                    {
                        title: 'ГОСТ'
                    },
                    {
                        title: 'DIN'
                    }
                ]
            },
            verified: {
                title: 'Verified',
                options: [
                    {
                        title: 'Yes'
                    },
                    {
                        title: 'No'
                    },
                    {
                        title: 'Verified by me'
                    },
                    {
                        title: 'Doesn\'t matter'
                    }
                ]
            },
            buttons: {
                clear: 'Clear'
            }
        },
        countries: [
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Åland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'Andorra', code: 'AD'},
            {name: 'Angola', code: 'AO'},
            {name: 'Anguilla', code: 'AI'},
            {name: 'Antarctica', code: 'AQ'},
            {name: 'Antigua and Barbuda', code: 'AG'},
            {name: 'Argentina', code: 'AR'},
            {name: 'Armenia', code: 'AM'},
            {name: 'Aruba', code: 'AW'},
            {name: 'Australia', code: 'AU'},
            {name: 'Austria', code: 'AT'},
            {name: 'Azerbaijan', code: 'AZ'},
            {name: 'Bahamas', code: 'BS'},
            {name: 'Bahrain', code: 'BH'},
            {name: 'Bangladesh', code: 'BD'},
            {name: 'Barbados', code: 'BB'},
            {name: 'Belarus', code: 'BY'},
            {name: 'Belgium', code: 'BE'},
            {name: 'Belize', code: 'BZ'},
            {name: 'Benin', code: 'BJ'},
            {name: 'Bermuda', code: 'BM'},
            {name: 'Bhutan', code: 'BT'},
            {name: 'Bolivia', code: 'BO'},
            {name: 'Bosnia and Herzegovina', code: 'BA'},
            {name: 'Botswana', code: 'BW'},
            {name: 'Bouvet Island', code: 'BV'},
            {name: 'Brazil', code: 'BR'},
            {name: 'British Indian Ocean Territory', code: 'IO'},
            {name: 'Brunei Darussalam', code: 'BN'},
            {name: 'Bulgaria', code: 'BG'},
            {name: 'Burkina Faso', code: 'BF'},
            {name: 'Burundi', code: 'BI'},
            {name: 'Cambodia', code: 'KH'},
            {name: 'Cameroon', code: 'CM'},
            {name: 'Canada', code: 'CA'},
            {name: 'Cape Verde', code: 'CV'},
            {name: 'Cayman Islands', code: 'KY'},
            {name: 'Central African Republic', code: 'CF'},
            {name: 'Chad', code: 'TD'},
            {name: 'Chile', code: 'CL'},
            {name: 'China', code: 'CN'},
            {name: 'Christmas Island', code: 'CX'},
            {name: 'Cocos (Keeling) Islands', code: 'CC'},
            {name: 'Colombia', code: 'CO'},
            {name: 'Comoros', code: 'KM'},
            {name: 'Congo', code: 'CG'},
            {name: 'Congo, The Democratic Republic of the', code: 'CD'},
            {name: 'Cook Islands', code: 'CK'},
            {name: 'Costa Rica', code: 'CR'},
            {name: 'Cote D\'Ivoire', code: 'CI'},
            {name: 'Croatia', code: 'HR'},
            {name: 'Cuba', code: 'CU'},
            {name: 'Cyprus', code: 'CY'},
            {name: 'Czech Republic', code: 'CZ'},
            {name: 'Denmark', code: 'DK'},
            {name: 'Djibouti', code: 'DJ'},
            {name: 'Dominica', code: 'DM'},
            {name: 'Dominican Republic', code: 'DO'},
            {name: 'Ecuador', code: 'EC'},
            {name: 'Egypt', code: 'EG'},
            {name: 'El Salvador', code: 'SV'},
            {name: 'Equatorial Guinea', code: 'GQ'},
            {name: 'Eritrea', code: 'ER'},
            {name: 'Estonia', code: 'EE'},
            {name: 'Ethiopia', code: 'ET'},
            {name: 'Falkland Islands (Malvinas)', code: 'FK'},
            {name: 'Faroe Islands', code: 'FO'},
            {name: 'Fiji', code: 'FJ'},
            {name: 'Finland', code: 'FI'},
            {name: 'France', code: 'FR'},
            {name: 'French Guiana', code: 'GF'},
            {name: 'French Polynesia', code: 'PF'},
            {name: 'French Southern Territories', code: 'TF'},
            {name: 'Gabon', code: 'GA'},
            {name: 'Gambia', code: 'GM'},
            {name: 'Georgia', code: 'GE'},
            {name: 'Germany', code: 'DE'},
            {name: 'Ghana', code: 'GH'},
            {name: 'Gibraltar', code: 'GI'},
            {name: 'Greece', code: 'GR'},
            {name: 'Greenland', code: 'GL'},
            {name: 'Grenada', code: 'GD'},
            {name: 'Guadeloupe', code: 'GP'},
            {name: 'Guam', code: 'GU'},
            {name: 'Guatemala', code: 'GT'},
            {name: 'Guernsey', code: 'GG'},
            {name: 'Guinea', code: 'GN'},
            {name: 'Guinea-Bissau', code: 'GW'},
            {name: 'Guyana', code: 'GY'},
            {name: 'Haiti', code: 'HT'},
            {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
            {name: 'Holy See (Vatican City State)', code: 'VA'},
            {name: 'Honduras', code: 'HN'},
            {name: 'Hong Kong', code: 'HK'},
            {name: 'Hungary', code: 'HU'},
            {name: 'Iceland', code: 'IS'},
            {name: 'India', code: 'IN'},
            {name: 'Indonesia', code: 'ID'},
            {name: 'Iran, Islamic Republic Of', code: 'IR'},
            {name: 'Iraq', code: 'IQ'},
            {name: 'Ireland', code: 'IE'},
            {name: 'Isle of Man', code: 'IM'},
            {name: 'Israel', code: 'IL'},
            {name: 'Italy', code: 'IT'},
            {name: 'Jamaica', code: 'JM'},
            {name: 'Japan', code: 'JP'},
            {name: 'Jersey', code: 'JE'},
            {name: 'Jordan', code: 'JO'},
            {name: 'Kazakhstan', code: 'KZ'},
            {name: 'Kenya', code: 'KE'},
            {name: 'Kiribati', code: 'KI'},
            {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
            {name: 'Korea, Republic of', code: 'KR'},
            {name: 'Kuwait', code: 'KW'},
            {name: 'Kyrgyzstan', code: 'KG'},
            {name: 'Lao People\'S Democratic Republic', code: 'LA'},
            {name: 'Latvia', code: 'LV'},
            {name: 'Lebanon', code: 'LB'},
            {name: 'Lesotho', code: 'LS'},
            {name: 'Liberia', code: 'LR'},
            {name: 'Libyan Arab Jamahiriya', code: 'LY'},
            {name: 'Liechtenstein', code: 'LI'},
            {name: 'Lithuania', code: 'LT'},
            {name: 'Luxembourg', code: 'LU'},
            {name: 'Macao', code: 'MO'},
            {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
            {name: 'Madagascar', code: 'MG'},
            {name: 'Malawi', code: 'MW'},
            {name: 'Malaysia', code: 'MY'},
            {name: 'Maldives', code: 'MV'},
            {name: 'Mali', code: 'ML'},
            {name: 'Malta', code: 'MT'},
            {name: 'Marshall Islands', code: 'MH'},
            {name: 'Martinique', code: 'MQ'},
            {name: 'Mauritania', code: 'MR'},
            {name: 'Mauritius', code: 'MU'},
            {name: 'Mayotte', code: 'YT'},
            {name: 'Mexico', code: 'MX'},
            {name: 'Micronesia, Federated States of', code: 'FM'},
            {name: 'Moldova, Republic of', code: 'MD'},
            {name: 'Monaco', code: 'MC'},
            {name: 'Mongolia', code: 'MN'},
            {name: 'Montenegro', code: 'ME'},
            {name: 'Montserrat', code: 'MS'},
            {name: 'Morocco', code: 'MA'},
            {name: 'Mozambique', code: 'MZ'},
            {name: 'Myanmar', code: 'MM'},
            {name: 'Namibia', code: 'NA'},
            {name: 'Nauru', code: 'NR'},
            {name: 'Nepal', code: 'NP'},
            {name: 'Netherlands', code: 'NL'},
            {name: 'Netherlands Antilles', code: 'AN'},
            {name: 'New Caledonia', code: 'NC'},
            {name: 'New Zealand', code: 'NZ'},
            {name: 'Nicaragua', code: 'NI'},
            {name: 'Niger', code: 'NE'},
            {name: 'Nigeria', code: 'NG'},
            {name: 'Niue', code: 'NU'},
            {name: 'Norfolk Island', code: 'NF'},
            {name: 'Northern Mariana Islands', code: 'MP'},
            {name: 'Norway', code: 'NO'},
            {name: 'Oman', code: 'OM'},
            {name: 'Pakistan', code: 'PK'},
            {name: 'Palau', code: 'PW'},
            {name: 'Palestinian Territory, Occupied', code: 'PS'},
            {name: 'Panama', code: 'PA'},
            {name: 'Papua New Guinea', code: 'PG'},
            {name: 'Paraguay', code: 'PY'},
            {name: 'Peru', code: 'PE'},
            {name: 'Philippines', code: 'PH'},
            {name: 'Pitcairn', code: 'PN'},
            {name: 'Poland', code: 'PL'},
            {name: 'Portugal', code: 'PT'},
            {name: 'Puerto Rico', code: 'PR'},
            {name: 'Qatar', code: 'QA'},
            {name: 'Reunion', code: 'RE'},
            {name: 'Romania', code: 'RO'},
            {name: 'Russian Federation', code: 'RU'},
            {name: 'Rwanda', code: 'RW'},
            {name: 'Saint Helena', code: 'SH'},
            {name: 'Saint Kitts and Nevis', code: 'KN'},
            {name: 'Saint Lucia', code: 'LC'},
            {name: 'Saint Pierre and Miquelon', code: 'PM'},
            {name: 'Saint Vincent and the Grenadines', code: 'VC'},
            {name: 'Samoa', code: 'WS'},
            {name: 'San Marino', code: 'SM'},
            {name: 'Sao Tome and Principe', code: 'ST'},
            {name: 'Saudi Arabia', code: 'SA'},
            {name: 'Senegal', code: 'SN'},
            {name: 'Republic of Serbia', code: 'RS'},
            {name: 'Seychelles', code: 'SC'},
            {name: 'Sierra Leone', code: 'SL'},
            {name: 'Singapore', code: 'SG'},
            {name: 'Slovakia', code: 'SK'},
            {name: 'Slovenia', code: 'SI'},
            {name: 'Solomon Islands', code: 'SB'},
            {name: 'Somalia', code: 'SO'},
            {name: 'South Africa', code: 'ZA'},
            {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
            {name: 'Spain', code: 'ES'},
            {name: 'Sri Lanka', code: 'LK'},
            {name: 'Sudan', code: 'SD'},
            {name: 'Suriname', code: 'SR'},
            {name: 'Svalbard and Jan Mayen', code: 'SJ'},
            {name: 'Swaziland', code: 'SZ'},
            {name: 'Sweden', code: 'SE'},
            {name: 'Switzerland', code: 'CH'},
            {name: 'Syrian Arab Republic', code: 'SY'},
            {name: 'Taiwan, Province of China', code: 'TW'},
            {name: 'Tajikistan', code: 'TJ'},
            {name: 'Tanzania, United Republic of', code: 'TZ'},
            {name: 'Thailand', code: 'TH'},
            {name: 'Timor-Leste', code: 'TL'},
            {name: 'Togo', code: 'TG'},
            {name: 'Tokelau', code: 'TK'},
            {name: 'Tonga', code: 'TO'},
            {name: 'Trinidad and Tobago', code: 'TT'},
            {name: 'Tunisia', code: 'TN'},
            {name: 'Turkey', code: 'TR'},
            {name: 'Turkmenistan', code: 'TM'},
            {name: 'Turks and Caicos Islands', code: 'TC'},
            {name: 'Tuvalu', code: 'TV'},
            {name: 'Uganda', code: 'UG'},
            {name: 'Ukraine', code: 'UA'},
            {name: 'United Arab Emirates', code: 'AE'},
            {name: 'United Kingdom', code: 'GB'},
            {name: 'United States', code: 'US'},
            {name: 'United States Minor Outlying Islands', code: 'UM'},
            {name: 'Uruguay', code: 'UY'},
            {name: 'Uzbekistan', code: 'UZ'},
            {name: 'Vanuatu', code: 'VU'},
            {name: 'Venezuela', code: 'VE'},
            {name: 'Vietnam', code: 'VN'},
            {name: 'Virgin Islands, British', code: 'VG'},
            {name: 'Virgin Islands, U.S.', code: 'VI'},
            {name: 'Wallis and Futuna', code: 'WF'},
            {name: 'Western Sahara', code: 'EH'},
            {name: 'Yemen', code: 'YE'},
            {name: 'Zambia', code: 'ZM'},
            {name: 'Zimbabwe', code: 'ZW'}
        ]
    },
    rus: {
        pages: {
            login: {
                password: 'пароль',
                login: 'Войти',
                textForgotPassword: 'Забыли свой email или пароль?',
                recoverAccount: 'Восстановите аккаунт',
                textHaveAccount: 'У Вас ещё нет аккаунта?',
                createAccount: 'Создайте аккаунт.'
            },
            registration: {
                form: {
                    name: {
                        label: 'имя',
                        placeholder: 'введите имя'
                    },
                    email: {
                        label: 'e-mail',
                        placeholder: 'введите e-mail'
                    },
                    password: {
                        label: 'пароль',
                        placeholder: 'введите пароль'
                    },
                    repeatPassword: {
                        label: 'повторите пароль',
                        placeholder: 'повторите ввод пароля'
                    }
                },
                toast: {
                    error: {
                        name: 'Введите корректное имя',
                        email: 'Введите корректный email',
                        password: 'Пароль должен быть длиной от 8 до 100 символов, иметь заглавные буквы, строчные буквы, цифры',
                        repeatPassword: 'Введённые пароли не совпадают'
                    }
                },
                create: 'Создать',
                haveAccount: 'У Вас уже есть аккаунт?',
                login: 'Войти.',
                completionRegistration: 'Для завершения регистрации перейдите по ссылке на вашей почте',
            },
            notifications: {
                edit: 'Редактировать',
                navbarTitle:
                    'Уведомления',
                notFound:
                    'Уведомления не найдены',
                today:
                    'сегодня',
                yesterday:
                    'вчера',
                in:
                    'в',
                youSend:
                    'Вы **отправили**',
                youReceive:
                    'Вы **получили**',
                toAddress:
                    'на адрес',
                fromAddress:
                    'с адреса',
                selectAll:
                    'Выбрать все'
            }
            ,
            settings: {
                navbarTitle: 'Настройки',
                panelHeadingGeneral:
                    'Общие',
                fullName:
                    'Полное имя',
                password:
                    'Пароль',
                passwordLabel:
                    {
                        first: "Последнее изменение пароля было",
                        second:
                            "дня назад",
                        third:
                            "дней назад"
                    }
                ,
                language: 'Язык',
                logout:
                    'Выход',
                security:
                    'Безопасность',
                theme:
                    'Выберите тему',
                _2fa:
                    'Двухфакторная аутентификация',
                _2faText:
                    'Вы можете добавить второй уровень защиты с помощью двухэтапной аутентификации. Для переключения потребуется одноразовый код, отправленный на ваш телефон, или стороннее приложение для аутентификации.'
            }
            ,
            summary: {
                navbarTitle: 'Обзор',
                notFound:
                    'Транзакции не найдены',
                buttons: {
                    send: 'Отправить',
                    request:
                        'Получить',
                    reset:
                        'Сбросить фильтр'
                },
                panelHeadings: {
                    recent: 'Недавняя активность'
                },
                rightMenu: {
                    summary: 'Обзор',
                    walletOffers:
                        'Предложения',
                    send:
                        'Отправить',
                    transactions:
                        'Транзакции',
                    walletSettings:
                        'Настройки кошелька'
                },
                searchPanel: {
                    search: 'Поиск транзакций...',
                    dateRange:
                        'Выберите диапазон дат',
                    langDate:
                        'ru',
                    buttons: {
                        download: 'Загрузить PDF',
                        share: 'Поделиться'
                    },
                    info: {
                        received: 'Получено',
                        sent: 'Отправлено',
                        starting: 'На начало',
                        total: 'Всего'
                    }
                },
                activityList: {
                    today: 'Сегодня',
                    yesterday: 'Вчера',
                    from: 'От:',
                    to: 'В:',
                    purpose: 'Целевая сделка',
                    status: {
                        sent: 'Отправлено',
                        recieved: 'Получено'
                    },
                    resultDay: {
                        received: 'Получено',
                        sent: 'Отправлено',
                        total: 'Всего'
                    }
                }
            },
            walletsList: {
                search: 'Поиск кошелька...',
                addNew: 'Добавить кошелек'
            },
            jobOffers: {
                navbarTitle: 'Предложения о работе',
                amountOffers: 'предложений',
                notFoundOffersByFilter: 'Нет предложений, соответствующих фильтрам',
                filters: {
                    onPage: 'предложений на странице',
                    sortBy: {
                        title: 'Сортировать по'
                    }
                },
                filtersBlock: {
                    title: 'Фильтры',
                    price:
                        {
                            title: 'Цена',
                            from: 'от',
                            to: 'до'
                        },
                    type: {
                        title: 'Тип'
                    },
                    contractor: {
                        title: 'Рейтинг работодателя',
                        from: 'от',
                        to: 'до'
                    },
                    profArea: {
                        title: 'Профессиональная область',
                    },
                    duration: {
                        title: 'Продолжительность проекта'
                    }
                },
                newOfferBlock: {
                    title: 'Вы работодатель?',
                    subTitle: 'Создайте задачу'
                },
                rightMenu: {
                    savedOffers: 'Сохраненное',
                    createOffer: 'Создать новое'
                }
            },
            singleOffer: {
                requirements: 'Требования',
                deadline: 'Заказнчивается через',
                parseEnd:
                    {
                        single: 'День',
                        more: 'Дней'
                    }
            },
            jobOffer: {
                navbarTitle: 'Предложение работы',
                fields:
                    {
                        description: 'Описание',
                        requirements: 'Требования',
                        deadline: {
                            title: 'Крайний срок'
                        }
                    }
            },
            walletSettings: {
                navbarTitle: 'Настройки кошелька',
                fields:
                    {
                        name: {
                            walletName: 'Имя кошелька'
                        },
                        spendingPass: {
                            label: 'Транзакия с паролем',
                            text: 'Включить пароль для одобрения транзакций'
                        },
                        deleteWallet: 'Удалить кошелек'
                    }
            },
            walletOffers: {
                navbarTitle: 'Портфолио',
                hideComplete: 'Скрыть завершенные задания',
                portfolios:
                    {
                        title: 'Портфолио',
                        empty: {
                            title: 'Портфель пуст',
                            btntext: 'Найти задачу'
                        },
                        noTasks: {
                            title: 'У вас, похоже, нет работы',
                            btntext: 'Найти новую задачу'
                        }
                    },
                offers: {
                    title: 'Ваши предложения',
                    empty: {
                        title: 'Вы работодатель?',
                        btntext:
                            'Создайте собственную задачу'
                    },
                    noTasks: {
                        title: 'Все ваши предложения завершены',
                        btntext: 'Создайте новыйe'
                    }
                }
            },
            newOffer: {
                navbarTitle: 'Создать новое предложение',
                panelHeadings:
                    {
                        generel: 'Главная информация',
                        specification:
                            'Спецификация',
                        actions: 'Действия'
                    },
                fields: {
                    uploadFile: {
                        title: 'Загрузите файл спецификации здесь',
                        btntext: 'Выберите файл...'
                    }
                    ,
                    name: {
                        label: 'Название предложения',
                        placeholder: 'Введите название предложения здесь'
                    },
                    price: {
                        label: 'Цена, alc',
                        placeholder: 'Установите свою цену'
                    },
                    description: {
                        label: 'описание',
                        placeholder: 'Введите описание здесь. Вы можете стилизовать текст только с помощью *жирных* и _курсивных_ изменений'
                    },
                    requirements: {
                        label: 'Требования',
                        placeholder: 'Добавить навыки и требования'
                    },
                    deadline: {
                        label: 'Крайний срок',
                        placeholder: 'Выберите дату'
                    }
                },
                buttons: {
                    upload: 'Загрузить',
                    publish: 'Опубликовать предложение'
                }
            },
        },
        modals: {
            newWallet: {
                new: {
                    label: 'Создать кошелек',
                    fields: {
                        title: {
                            label: 'Название',
                            placeholder: 'Название кошелька'
                        }
                    },
                    button: 'Создать'
                },
                import: {
                    label: 'Импортировать',
                    button:
                        'Выкупить',
                    fields:
                        {
                            title: {
                                label: 'Название',
                                placeholder: 'Название кошелька'
                            },
                            mnemonic: {
                                label: 'Мнемоническая фраза',
                                placeholder: 'Мнемоническая фраза'
                            }
                        }
                },
                redeem: {
                    label: 'Получить токены с pre-ico',
                    button: 'Выкупить',
                    fields:
                        {
                            title: {
                                label: 'Название',
                                placeholder: 'Название кошелька'
                            },
                            key: {
                                label: 'Ключ выкупа',
                                placeholder: 'Ключ выкупа'
                            },
                            decrypt: {
                                label: 'Фраза для восстановления кошелька'
                            }
                        }
                },
                recovery: {
                    phrase: {
                        title: 'Фраза восстановления',
                        text: 'На следующем экране вы увидите набор случайных слов X. Это ваша резервная копия кошелька. Он может быть введен в любую версию приложения ALE для резервного копирования или восстановления ваших кошельков и частного ключа.',
                        checkbox: 'Убедитесь, что никто не смотрит на ваш экран, если вы не хотите, чтобы у них был доступ к вашим средствам.',
                        btn: 'Продолжить'
                    }
                    ,
                    mnemonic: {
                        text: 'Пожалуйста, убедитесь, что вы тщательно записали фразу восстановления в безопасном месте. Вам понадобится эта фраза позже для последующего использования и восстановления. Фраза чувствительна к регистру.',
                        btnCopy: 'Скопировать фразу',
                        btn: 'Да, я записал еe',
                        toastedSuccessMnemonic: 'Мнемоническая фраза успешно скопирована'
                    },
                    finish: {
                        each: 'Введите каждое слово в правильном порядке, чтобы подтвердить свою фразу восстановления',
                        fields:
                            {
                                phrase: {
                                    title: 'Фраза восстановления',
                                    placeholder: 'введите фразу восстановления'
                                },
                                deviceOnly: 'Я понимаю, что мои деньги хранятся только на этом устройстве, а не на серверах компании',
                                secure: 'Я понимаю, что если это приложение перенесено на другое устройство или удалено, мои деньги могут быть восстановлены только с резервной фразой, записанной в безопасном месте'
                            },
                        btn: {
                            clear: 'Очистить',
                            confirm: 'Подтвердить'
                        }
                    }
                }
            },
            send: {
                title: 'Отправить',
                amount:
                    'Количество',
                max:
                    'максимальная сумма',
                address:
                    'Aдрес',
                addressPlaceholder:
                    'Введите адрес криптокошелька',
                total:
                    'Всего',
                sendText:
                    'Вы отправляете',
                to:
                    'в',
                footerModal:
                    'Отправление прошло успешно',
                buttons:
                    {
                        next: 'Далее',
                        send:
                            'Отправить'
                    }
            }
            ,
            request: {
                title: 'Получить',
                receiver:
                    'Адрес получателя',
                qrShare:
                    'Поделитесь этим QR-кодом, чтобы получать платежи',
                button:
                    'Скопировать'
            }
            ,
            deleteWallet: {
                title: 'Удалить кошелек',
                confirm:
                    {
                        titleStart: 'Вы действительно хотите удалить',
                        titleEnd:
                            'кошелек?',
                        subtitle:
                            'Перед продолжением убедитесь, что у вас есть доступ к резервной копии. В противном случае вы потеряете все свои средства, связанные с этим кошельком.'
                    }
                ,
                fields: {
                    walletName: {
                        label: 'Введите имя кошелька, чтобы подтвердить удаление',
                        placeholder:
                            'имя кошелька'
                    }
                }
                ,
                buttons: {
                    cancel: 'Отмена',
                    delete:
                        'Удалить'
                }
            }
            ,
            changeTwoAuth: {
                title: {
                    enable: 'Включить двухфакторную аутентификацию',
                    disable:
                        'Выключить двухфакторную аутентификацию'
                }
                ,
                warning: 'Сохраните этот секретный код в безопасном месте',
                buttons:
                    {
                        enable: 'Включить',
                        disable:
                            'Выключить',
                        copy:
                            'Скопировать секретный ключ'
                    }
                ,
                fields: {
                    secret: {
                        label: 'Секретный ключ',
                        placeholder:
                            'Введите секретный ключ'
                    }
                    ,
                    _2fa: {
                        label: '2fa ключ',
                        placeholder:
                            'Введите 2fa ключ'
                    }
                }
            }
            ,
            changePassword: {
                title: 'Изменить пароль',
                fields:
                    {
                        _2fa: {
                            label: '2fa ключ',
                            placeholder:
                                'Введите 2fa ключ'
                        }
                        ,
                        oldPass: {
                            label: 'Старый пароль',
                            placeholder:
                                'Старый пароль'
                        }
                        ,
                        newPass: {
                            label: 'Новый пароль',
                            placeholder:
                                'Новый пароль'
                        }
                        ,
                        confirmPass: {
                            label: 'Повторите пароль',
                            placeholder:
                                'Подтвердите новый пароль'
                        }
                    }
                ,
                buttons: {
                    change: 'Изменить'
                }
            }
            ,
            changeEmail: {
                title: 'Изменить email',
                fields:
                    {
                        _2fa: {
                            label: '2fa ключ',
                            placeholder:
                                'Введите 2fa ключ'
                        }
                        ,
                        newEmail: {
                            label: 'Email',
                            placeholder:
                                'Введите новый email'
                        }
                        ,
                    }
                ,
                buttons: {
                    change: 'Изменить'
                }
            }
            ,
            share: {
                title: 'Поделиться',
                label:
                    'Добавить комментарий',
                placeholder:
                    'Напишите свой комментарий здесь'
            }
            ,
            pdf: {
                title: 'Экспорт в PDF',
                firstDesc:
                    'Выбирите как Вы хотите вывести транзакции',
                firstRadio:
                    {
                        first: 'Текущие транзакции кошелька',
                        second:
                            'Все транзакции',
                        third:
                            'Персональная настройка',
                    }
                ,
                secondDesc: 'Выбирите транзакции каких кошельков Вы хотите вывести',
                selectAll:
                    'Выбрать все',
                tags:
                    'Теги',
                thirdDesc:
                    'Введите теги чтобы выбрать определенные транзакции (необязательно)',
                TransactionsType:
                    'Вид транзакции',
                secondRadio:
                    {
                        first: 'Полученные',
                        second:
                            'Отправленные',
                        third:
                            'Все',
                    }
                ,
                range: 'Размер суммы транзакции',
                from:
                    'от',
                to:
                    'до',
                button:
                    {
                        reset: 'Сбросить фильтры',
                        export1:
                            "Экспортировать",
                        export2:
                            "транзакции"
                    }
                ,
                lang: 'ru'
            }
            ,
            error: {
                setAvatar: 'Не удалось загрузить фотографию',
                moreThanZero: 'Транзакция должна быть больше чем 0',
                moreThanHave:
                    'Вы не можете отправить токенов больше, чем есть у вас в кошельке',
                toYourself:
                    'Вы не можете отправлять токены на кошелек с которого отправляете',
                sendFail:
                    'Отправка не удалась',
                wrongMail:
                    'Вы ввели не верные данные',
                lenght2faCheck:
                    'Длина кода должна быть не меньше 6 символов',
                projectData:
                    'Вы отправляете неверные данные для смены пароля',
                differentPass:
                    'Пароли не совпадают',
                lengthPass:
                    'Длина пароля должна быть не менее 8 символов.',
                changeAddr:
                    'Вы не подтвердили изменение адреса электронной почты',
                cancelChangeAddr:
                    'Вы отказались от изменения адреса электронной почты',
                logout:
                    'Ошибка при выходе из системы',
                changeNameWallet:
                    'Не удалось изменить имя вашего кошелька',
                checkOffer:
                    'Заполните поле предложения работы',
                checkPrice:
                    'Заполните поле вознаграждения за работу',
                checkPriceZero:
                    'Поле вознаградения должно быть больше чем 0',
                checkDesc:
                    'Поле описания не должно быть пустым',
                checkRequirements:
                    'Поле требований не должно быть пустым',
                checkDeadline:
                    'Поле дедлайна не должно быть пустым',
                checkUpload:
                    'Файл для загрузки не был выбран',
                checkUploadButton:
                    'Кнопка загрузки файлов не была нажата',
                checkRedeem:
                    'Загрузите ваше решение прежде чем принять',
                walletRedeem:
                    'Не удалось создать кошелек',
                disable2fa:
                    'Двойная аутентификация не была отключена',
                enable2fa:
                    'Двойная аутентификация не была включена',
                walletDelete:
                    'Ошибка при удалении кошелька',
                changePassword: {
                    first: "Вы не можете изменить",
                    second: "без активации двойной аутентификации"
                }
            },
            lang: {
                submit: "Принять",
                title: "Выберите язык"
            },
            success: {
                changeMail: 'Подтверждение на изменение почты было отправлено на этот адрес',
                changePass: 'Пароль был успешно изменен',
                changeName: 'Ваше имя было успешно изменено',
                setAvatar: 'Фотография успешно загружена',
                newWallet: {
                    wallet: "Кошелек",
                    create: "успешно создан!",
                    delete: "успешно удален!"
                },
                copyWallet: 'Вы успешно скопировали адрес кошелька',
                changeAddr: 'Вы успешно подтвердили изменение адреса электронной почты',
                cancelChangeAddr: 'Вы успешно отменили изменение адреса электронной почты',
                changeNameWallet: 'Название кошелька было успешно изменено',
                checkUpload: 'Выбранный файл был успешно загружен',
                saveOffer: 'Предложение сохранено',
                removeOffer: 'Предложение было успешно удалено из сохраненных',
                copySecretCode: 'секретный код был успешно скопирован',
                disable2fa: 'Вы успешно отключили двойную аутентификацию',
                enable2fa: 'Вы успешно включили двойную аутентификацию',
            }

        },
        navbar: {
            wallet: 'Кошелек',
            offers: 'Предложения о работе',
            resume: 'Резюме',
            notifications: 'Оповещения',
            settings: 'Настройки'
        },
        stateBar: {
            timeInterval: 'Контрактный период',
            name: 'Название',
            rating: 'Рейтинг',
            price: 'Цена',
            certification: 'Сертификация',
            verified: 'Верификация'
        },
        offersFilter: {
            name: {
                title: 'Название'
            },
            rating: {
                title: 'Рейтинг',
                from: 'от',
                to: 'до'
            },
            price: {
                title: 'Стоимость',
                from: 'от',
                to: 'до'
            },
            country: {
                title: 'Страна',
                selectAll: 'Выбрать всё'
            },
            certification: {
                title: 'Сертификация',
                options: [
                    {
                        title: 'ГОСТ'
                    },
                    {
                        title: 'DIN'
                    }
                ]
            },
            verified: {
                title: 'Верификация',
                options: [
                    {
                        title: 'Да'
                    },
                    {
                        title: 'Нет'
                    },
                    {
                        title: 'Проверено мной'
                    },
                    {
                        title: 'Без разницы'
                    }
                ]
            },
            buttons: {
                clear: 'Очистить'
            }
        },
        countries: [
            {name: 'Афганистан', code: 'AF'},
            {name: 'Аландские острова', code: 'AX'},
            {name: 'Албания', code: 'AL'},
            {name: 'Алжир', code: 'DZ'},
            {name: 'Американское Самоа', code: 'AS'},
            {name: 'Андорра', code: 'AD'},
            {name: 'Ангола', code: 'AO'},
            {name: 'Ангилья', code: 'AI'},
            {name: 'Антарктида', code: 'AQ'},
            {name: 'Антигуа и Барбуда', code: 'AG'},
            {name: 'Аргентина', code: 'AR'},
            {name: 'Армения', code: 'AM'},
            {name: 'Аруба', code: 'AW'},
            {name: 'Австралия', code: 'AU'},
            {name: 'Австрия', code: 'AT'},
            {name: 'Азербайджан', code: 'AZ'},
            {name: 'Багамские острова', code: 'BS'},
            {name: 'Бахрейн', code: 'BH'},
            {name: 'Бангладеш', code: 'BD'},
            {name: 'Барбадос', code: 'BB'},
            {name: 'Беларусь', code: 'BY'},
            {name: 'Бельгия', code: 'BE'},
            {name: 'Белиз', code: 'BZ'},
            {name: 'Бенин', code: 'BJ'},
            {name: 'Бермудские Острова', code: 'BM'},
            {name: 'Бутан', code: 'BT'},
            {name: 'Боливия', code: 'BO'},
            {name: 'Босния и Герцеговина', code: 'BA'},
            {name: 'Ботсвана', code: 'BW'},
            {name: 'Остров Буве', code: 'BV'},
            {name: 'Бразилия', code: 'BR'},
            {name: 'Британская Территория в Индийском Океане', code: 'IO'},
            {name: 'Бруней', code: 'BN'},
            {name: 'Болгария', code: 'BG'},
            {name: 'Буркина-Фасо', code: 'BF'},
            {name: 'Бурунди', code: 'BI'},
            {name: 'Камбоджа', code: 'KH'},
            {name: 'Камерун', code: 'CM'},
            {name: 'Канада', code: 'CA'},
            {name: 'Кабо-Верде', code: 'CV'},
            {name: 'Острова Кайман', code: 'KY'},
            {name: 'Центральноафриканская Республика', code: 'CF'},
            {name: 'Чад', code: 'TD'},
            {name: 'Чили', code: 'CL'},
            {name: 'Китай', code: 'CN'},
            {name: 'Остров Рождества', code: 'CX'},
            {name: 'Кокосовые острова', code: 'CC'},
            {name: 'Колумбия', code: 'CO'},
            {name: 'Коморы', code: 'KM'},
            {name: 'Конго', code: 'CG'},
            {name: 'Демократическая Республика Конго', code: 'CD'},
            {name: 'Острова Кука', code: 'CK'},
            {name: 'Коста-Рика', code: 'CR'},
            {name: 'Кот-д’Ивуар', code: 'CI'},
            {name: 'Хорватия', code: 'HR'},
            {name: 'Куба', code: 'CU'},
            {name: 'Кипр', code: 'CY'},
            {name: 'Чехия', code: 'CZ'},
            {name: 'Дания', code: 'DK'},
            {name: 'Джибути', code: 'DJ'},
            {name: 'Доминика', code: 'DM'},
            {name: 'Доминиканская Республика', code: 'DO'},
            {name: 'Эквадор', code: 'EC'},
            {name: 'Египет', code: 'EG'},
            {name: 'Сальвадор', code: 'SV'},
            {name: 'Экваториальная Гвинея', code: 'GQ'},
            {name: 'Эритрея', code: 'ER'},
            {name: 'Эстония', code: 'EE'},
            {name: 'Эфиопия', code: 'ET'},
            {name: 'Фолклендские острова', code: 'FK'},
            {name: 'Фарерские острова', code: 'FO'},
            {name: 'Фиджи', code: 'FJ'},
            {name: 'Финляндия', code: 'FI'},
            {name: 'Франция', code: 'FR'},
            {name: 'Гвиана', code: 'GF'},
            {name: 'Французская Полинезия', code: 'PF'},
            {name: 'Французские Южные и Антарктические территории', code: 'TF'},
            {name: 'Габон', code: 'GA'},
            {name: 'Гамбия', code: 'GM'},
            {name: 'Грузия', code: 'GE'},
            {name: 'Германия', code: 'DE'},
            {name: 'Гана', code: 'GH'},
            {name: 'Гибралтар', code: 'GI'},
            {name: 'Греция', code: 'GR'},
            {name: 'Гренландия', code: 'GL'},
            {name: 'Гренада', code: 'GD'},
            {name: 'Гваделупа', code: 'GP'},
            {name: 'Гуам', code: 'GU'},
            {name: 'Гватемала', code: 'GT'},
            {name: 'Гернси', code: 'GG'},
            {name: 'Гвинея', code: 'GN'},
            {name: 'Гвинея-Бисау', code: 'GW'},
            {name: 'Гайана', code: 'GY'},
            {name: 'Республика Гаити', code: 'HT'},
            {name: 'Остров Херд и острова Макдональд', code: 'HM'},
            {name: 'Ватикан', code: 'VA'},
            {name: 'Гондурас', code: 'HN'},
            {name: 'Гонконг', code: 'HK'},
            {name: 'Венгрия', code: 'HU'},
            {name: 'Исландия', code: 'IS'},
            {name: 'Индия', code: 'IN'},
            {name: 'Индонезия', code: 'ID'},
            {name: 'Иран, Islamic Republic Of', code: 'IR'},
            {name: 'Ирак', code: 'IQ'},
            {name: 'Ирландия', code: 'IE'},
            {name: 'Остров Мэн', code: 'IM'},
            {name: 'Израиль', code: 'IL'},
            {name: 'Италия', code: 'IT'},
            {name: 'Ямайка', code: 'JM'},
            {name: 'Япония', code: 'JP'},
            {name: 'Джерси', code: 'JE'},
            {name: 'Иордания', code: 'JO'},
            {name: 'Казахстан', code: 'KZ'},
            {name: 'Кения', code: 'KE'},
            {name: 'Кирибати', code: 'KI'},
            {name: 'Корейская Народно-Демократическая Республика', code: 'KP'},
            {name: 'Республика Корея', code: 'KR'},
            {name: 'Кувейт', code: 'KW'},
            {name: 'Киргизия', code: 'KG'},
            {name: 'Лаос', code: 'LA'},
            {name: 'Латвия', code: 'LV'},
            {name: 'Ливан', code: 'LB'},
            {name: 'Лесото', code: 'LS'},
            {name: 'Либерия', code: 'LR'},
            {name: 'Ливия', code: 'LY'},
            {name: 'Лихтенштейн', code: 'LI'},
            {name: 'Литва', code: 'LT'},
            {name: 'Люксембург', code: 'LU'},
            {name: 'Макао', code: 'MO'},
            {name: 'Республика Македония', code: 'MK'},
            {name: 'Мадагаскар', code: 'MG'},
            {name: 'Малави', code: 'MW'},
            {name: 'Малайзия', code: 'MY'},
            {name: 'Мальдивы', code: 'MV'},
            {name: 'Мали', code: 'ML'},
            {name: 'Мальта', code: 'MT'},
            {name: 'Маршалловы Острова', code: 'MH'},
            {name: 'Мартиника', code: 'MQ'},
            {name: 'Мавритания', code: 'MR'},
            {name: 'Маврикий', code: 'MU'},
            {name: 'Майотта', code: 'YT'},
            {name: 'Мексика', code: 'MX'},
            {name: 'Федеративные Штаты Микронезии', code: 'FM'},
            {name: 'Молдавия', code: 'MD'},
            {name: 'Монако', code: 'MC'},
            {name: 'Черногория', code: 'ME'},
            {name: 'Монголия', code: 'MN'},
            {name: 'Монтсеррат', code: 'MS'},
            {name: 'Марокко', code: 'MA'},
            {name: 'Мозамбик', code: 'MZ'},
            {name: 'Мьянма', code: 'MM'},
            {name: 'Намибия', code: 'NA'},
            {name: 'Науру', code: 'NR'},
            {name: 'Непал', code: 'NP'},
            {name: 'Нидерланды', code: 'NL'},
            {name: 'Нидерландские Антильские острова', code: 'AN'},
            {name: 'Новая Каледония', code: 'NC'},
            {name: 'Новая Зеландия', code: 'NZ'},
            {name: 'Никарагуа', code: 'NI'},
            {name: 'Нигер', code: 'NE'},
            {name: 'Нигерия', code: 'NG'},
            {name: 'Ниуэ', code: 'NU'},
            {name: 'Остров Норфолк', code: 'NF'},
            {name: 'Северные Марианские Острова', code: 'MP'},
            {name: 'Норвегия', code: 'NO'},
            {name: 'Оман', code: 'OM'},
            {name: 'Пакистан', code: 'PK'},
            {name: 'Палау', code: 'PW'},
            {name: 'Палестинские территории', code: 'PS'},
            {name: 'Панама', code: 'PA'},
            {name: 'Папуа — Новая Гвинея', code: 'PG'},
            {name: 'Парагвай', code: 'PY'},
            {name: 'Перу', code: 'PE'},
            {name: 'Филиппины', code: 'PH'},
            {name: 'Острова Питкэрн', code: 'PN'},
            {name: 'Польша', code: 'PL'},
            {name: 'Португалия', code: 'PT'},
            {name: 'Пуэрто-Рико', code: 'PR'},
            {name: 'Катар', code: 'QA'},
            {name: 'Реюньон', code: 'RE'},
            {name: 'Румыния', code: 'RO'},
            {name: 'Россия', code: 'RU'},
            {name: 'Руанда', code: 'RW'},
            {name: 'Остров Святой Елены', code: 'SH'},
            {name: 'Сент-Китс и Невис', code: 'KN'},
            {name: 'Сент-Люсия', code: 'LC'},
            {name: 'Сен-Пьер и Микелон', code: 'PM'},
            {name: 'Сент-Винсент и Гренадины', code: 'VC'},
            {name: 'Самоа', code: 'WS'},
            {name: 'Сан-Марино', code: 'SM'},
            {name: 'Сан-Томе и Принсипи', code: 'ST'},
            {name: 'Саудовская Аравия', code: 'SA'},
            {name: 'Сенегал', code: 'SN'},
            {name: 'Сербия', code: 'RS'},
            {name: 'Сейшельские Острова', code: 'SC'},
            {name: 'Сьерра-Леоне', code: 'SL'},
            {name: 'Сингапур', code: 'SG'},
            {name: 'Словакия', code: 'SK'},
            {name: 'Словения', code: 'SI'},
            {name: 'Соломоновы Острова', code: 'SB'},
            {name: 'Сомали', code: 'SO'},
            {name: 'Южно-Африканская Республика', code: 'ZA'},
            {name: 'Южная Георгия и Южные Сандвичевы Острова', code: 'GS'},
            {name: 'Испания', code: 'ES'},
            {name: 'Шри-Ланка', code: 'LK'},
            {name: 'Судан', code: 'SD'},
            {name: 'Суринам', code: 'SR'},
            {name: 'Шпицберген и Ян-Майен', code: 'SJ'},
            {name: 'Свазиленд', code: 'SZ'},
            {name: 'Швеция', code: 'SE'},
            {name: 'Швейцария', code: 'CH'},
            {name: 'Сирия', code: 'SY'},
            {name: 'Тайвань', code: 'TW'},
            {name: 'Таджикистан', code: 'TJ'},
            {name: 'Танзания', code: 'TZ'},
            {name: 'Таиланд', code: 'TH'},
            {name: 'Восточный Тимор', code: 'TL'},
            {name: 'Того', code: 'TG'},
            {name: 'Токелау', code: 'TK'},
            {name: 'Тонга', code: 'TO'},
            {name: 'Тринидад и Тобаго', code: 'TT'},
            {name: 'Тунис', code: 'TN'},
            {name: 'Турция', code: 'TR'},
            {name: 'Туркмения', code: 'TM'},
            {name: 'Теркс и Кайкос', code: 'TC'},
            {name: 'Тувалу', code: 'TV'},
            {name: 'Уганда', code: 'UG'},
            {name: 'Украина', code: 'UA'},
            {name: 'Объединённые Арабские Эмираты', code: 'AE'},
            {name: 'Великобритания', code: 'GB'},
            {name: 'Соединённые Штаты Америки', code: 'US'},
            {name: 'Внешние малые острова США', code: 'UM'},
            {name: 'Уругвай', code: 'UY'},
            {name: 'Узбекистан', code: 'UZ'},
            {name: 'Вануату', code: 'VU'},
            {name: 'Венесуэла', code: 'VE'},
            {name: 'Вьетнам', code: 'VN'},
            {name: 'Виргинские Острова', code: 'VG'},
            {name: 'Виргинские Острова', code: 'VI'},
            {name: 'Уоллис и Футуна', code: 'WF'},
            {name: 'Западная Сахара', code: 'EH'},
            {name: 'Йемен', code: 'YE'},
            {name: 'Замбия', code: 'ZM'},
            {name: 'Зимбабве', code: 'ZW'}
        ]
    }
};

export default messages;
