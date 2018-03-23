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
                fullName: 'Full name',
                email: 'E-mail',
                password: 'Password',
                repeatPassword: 'Repeat Password',
                create: 'Create',
                haveAccount: 'Already have an account?',
                login: 'Log in.',
                completionRegistration: 'To complete the registration, please follow the link on your mail',
                fillAllFields: 'Fill in all the fields',
                enterFullName: 'Enter your full name',
                enterEmail: 'Enter your email',
                enterPassword: 'Enter your password',
                enterRepeatPassword: 'Repeat password',
                enterValidEmail: 'Enter your valid email',
                enterCorrectLengthPassword: 'Password must be at least 8 characters long',
                enterMatchPassword: 'Passwords do not match'
            },
            notifications: {
                navbarTitle: 'Notifications feed',
                notFound: 'No notifications found',
                today: 'today',
                yesterday: 'yesterday',
                in: 'in'
            },
            settings: {
                navbarTitle: 'Settings',
                panelHeadingGeneral: 'General',
                fullName: 'Full name',
                password: 'Password',
                language: 'Language',
                logout: 'Log out',
                security: 'Security',
                theme: 'Select theme',
                _2fa: 'Two-factor authentification',
                _2faText: 'You can add a second layer of protection with 2-Step Verification, switch requires a single-use code sent to your phone or using third-party authentification app.'
            },
            summary: {
                navbarTitle: 'Summary',
                buttons: {
                    send: 'Send',
                    request: 'Request'
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
                }
            },
            walletsList: {
                search: 'Search wallet...',
                addNew: 'Add a new wallet'
            },
            jobOffers: {
                navbarTitle: 'Job Offers',
                amountOffers: 'offers',
                filters: {
                    onPage: 'offers on page',
                    sortBy: {
                        title: 'sort by'
                    }
                },
                filtersBlock: {
                    title: 'Filters',
                    price: {
                        title: 'Price',
                        from: 'from',
                        to: 'to'
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
                    deleteWallet: 'Delete wallet'
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
                            label: 'Phrase to decrypt certificate'
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
            }
        }
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
                fullName: 'Имя',
                email: 'E-mail',
                password: 'Пароль',
                repeatPassword: 'Повторите пароль',
                create: 'Создать',
                haveAccount: 'У Вас уже есть аккаунт?',
                login: 'Войти.',
                completionRegistration: 'Для завершения регистрации пройдите по ссылке на вашей почте',
                fillAllFields: 'Заполните все поля',
                enterFullName: 'Введите Ваше имя',
                enterEmail: 'Введите email',
                enterPassword: 'Введите Ваш пароль',
                enterRepeatPassword: 'Повторите пароль',
                enterValidEmail: 'Введите корректный пароль',
                enterCorrectLengthPassword: 'Пароль должен быть длиной минимум 8 символовPassword must be at least 8 characters long',
                enterMatchPassword: 'Пароли не совпадают'
            },
            notifications: {
                navbarTitle: 'Уведомления',
                notFound: 'Уведомления не найдены',
                today: 'сегодня',
                yesterday: 'вчера',
                in: 'в'
            },
            settings: {
                navbarTitle: 'Настройки',
                panelHeadingGeneral: 'Общие',
                fullName: 'Полное имя',
                password: 'Пароль',
                language: 'Язык',
                logout: 'Выход',
                security: 'Безопасность',
                theme: 'Выберите тему',
                _2fa: 'Двухфакторная аутентификация',
                _2faText: 'Вы можете добавить второй уровень защиты с помощью двухэтапной аутентификации. Для переключения потребуется одноразовый код, отправленный на ваш телефон, или стороннее приложение для аутентификации.'
            },
            summary: {
                navbarTitle: 'Обзор',
                buttons: {
                    send: 'Отправить',
                    request: 'Получить'
                },
                panelHeadings: {
                    recent: 'Недавняя активность'
                },
                rightMenu: {
                    summary: 'Обзор',
                    walletOffers: 'Предложения',
                    send: 'Отправить',
                    transactions: 'Транзакции',
                    walletSettings: 'Настройки'
                }
            },
            walletsList: {
                search: 'Поиск кошелька...',
                addNew: 'Добавить кошелек'
            },
            jobOffers: {
                navbarTitle: 'Предложения о работе',
                amountOffers: 'предложений',
                filters: {
                    onPage: 'предложений на странице',
                    sortBy: {
                        title: 'Сортировать по'
                    }
                },
                filtersBlock: {
                    title: 'Фильтры',
                    price: {
                        title: 'Цена',
                        from: 'от',
                        to: 'до'
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
                parseEnd: {
                    single: 'День',
                    more: 'Дней'
                }
            },
            jobOffer: {
                navbarTitle: 'Предложение работы',
                fields: {
                    description: 'Описание',
                    requirements: 'Требования',
                    deadline: {
                        title: 'Крайний срок'
                    }
                }
            },
            walletSettings: {
                navbarTitle: 'Настройки кошелька',
                fields: {
                    name: {
                        walletName: 'Имя кошелька'
                    },
                    deleteWallet: 'Удалить кошелек'
                }
            },
            walletOffers: {
                navbarTitle: 'Портфолио',
                hideComplete: 'Скрыть завершенные задания',
                portfolios: {
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
                        btntext: 'Создайте собственную задачу'
                    },
                    noTasks: {
                        title: 'Все ваши предложения завершены',
                        btntext: 'Создайте новыйe'
                    }
                }
            },
            newOffer: {
                navbarTitle: 'Создать новое предложение',
                panelHeadings: {
                    generel: 'Главная информация',
                    specification: 'Спецификация',
                    actions: 'Действия'
                },
                fields: {
                    uploadFile: {
                        title: 'Загрузите файл спецификации здесь',
                        btntext: 'Выберите файл...'
                    },
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
            }
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
                    button: 'Выкупить',
                    fields: {
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
                    fields: {
                        title: {
                            label: 'Название',
                            placeholder: 'Название кошелька'
                        },
                        key: {
                            label: 'Ключ выкупа',
                            placeholder: 'Ключ выкупа'
                        },
                        decrypt: {
                            label: 'Фраза для расшифровки'
                        }
                    }
                },
                recovery: {
                    phrase: {
                        title: 'Фраза восстановления',
                        text: 'На следующем экране вы увидите набор случайных слов X. Это ваша резервная копия кошелька. Он может быть введен в любую версию приложения ALE для резервного копирования или восстановления ваших кошельков и частного ключа.',
                        checkbox: 'Убедитесь, что никто не смотрит на ваш экран, если вы не хотите, чтобы у них был доступ к вашим средствам.',
                        btn: 'Продолжить'
                    },
                    mnemonic: {
                        text: 'Пожалуйста, убедитесь, что вы тщательно записали фразу восстановления в безопасном месте. Вам понадобится эта фраза позже для последующего использования и восстановления. Фраза чувствительна к регистру.',
                        btnCopy: 'Скопировать фразу',
                        btn: 'Да, я записал его',
                        toastedSuccessMnemonic: 'Мнемоническая фраза успешно скопирована'
                    },
                    finish: {
                        each: 'Введите каждое слово в правильном порядке, чтобы подтвердить свою фразу восстановления',
                        fields: {
                            phrase: {
                                title: 'Фраза восстановления',
                                placeholder: 'введите здесь фразу восстановления'
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
                amount: 'Количество',
                max: 'максимальная сумма',
                address: 'Aдрес',
                addressPlaceholder: 'Введите адрес криптокошелька',
                total: 'Всего',
                sendText: 'Вы отправляете',
                to: 'в',
                buttons: {
                    next: 'Далее',
                    send: 'Отправить'
                }
            },
            request: {
                title: 'Получить',
                receiver: 'Адрес получателя',
                qrShare: 'Поделитесь этим QR-кодом, чтобы получать платежи',
                button: 'Скопировать'
            },
            deleteWallet: {
                title: 'Удалить кошелек',
                confirm: {
                    titleStart: 'Вы действительно хотите удалить',
                    titleEnd: 'кошелек?',
                    subtitle: 'Перед продолжением убедитесь, что у вас есть доступ к резервной копии. В противном случае вы потеряете все свои средства, связанные с этим кошельком.'
                },
                fields: {
                    walletName: {
                        label: 'Введите имя кошелька, чтобы подтвердить удаление',
                        placeholder: 'имя кошелька'
                    }
                },
                buttons: {
                    cancel: 'Отмена',
                    delete: 'Удалить'
                }
            }
        }
    }
};

export default messages;
