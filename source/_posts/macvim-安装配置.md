---
title: macvim和tmux 安装配置
date: 2022-11-06 16:42:18
tags:
---
# macvim 和 tmux 安装


# 配置插件
```bash
# 查看预装vim版本
vim --version

# 查看预装vim路径
where vim

#使用brew 安装
brew install macvim

# 为macvim中的vim创建别名，将其添加至~/.zshrc配置文件
echo 'alias vim="/usr/local/Cellar/macvim/8.0-133/MacVim.app/Contents/MacOS/vim"' >> ~/.zshrc
# 重新加载.zshrc以使修改生效 
source ~/.zshrc
```
然后直接输入`vim`就能打开macvim
接下来给vim做配置
<!-- more -->
# vim配置参数
给`vim`添加参数

### 安装vim插件管理器——Vundle
`vim`的插件管理工具，安装、更新和移除vim插件，不需要手动来管理vim插件
#### 安装
```sh
git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```
安装好后，所有的插件都会在`~/.vim/bundle/`目录下，接下来可以通过`.vimrc`配置文件来管理所有扩展了。
可以到`github`中查看如何配置，下面是精简后的（`.vimrc`文件）
```vim
set nocompatible              " 去除VI一致性,必须
filetype off                  " 必须
" set the runtime path to include vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" 接下来就可以把插件放进去了，
" 这两个是官方默认放入的插件
Plugin 'vundlevim/vundle.vim'
Plugin 'tpope/vim-fugitive'

" 结尾
call vundle#end()            " required
filetype plugin indent on    " required
```
把插件放入 `call vundle#begin()` 和 `call vundle#end() `直接，使用`Plugin`开头。
配置后，控制台输入`vim`, 在`normal`模式下（也就是刚刚进入时的状态），输入并运行命令`:PluginInstall`来进行安装插件

#### 给macvim添加树状目录——NERDTree
```vim
"  添加插件
Plugin 'preservim/nerdtree'
```
文档：
```
F3：自定义启用/隐藏目录树
?: 快速帮助文档
o: 打开一个目录或者打开文件，创建的是buffer，也可以用来打开书签
go: 打开一个文件，但是光标仍然留在NERDTree，创建的是buffer
t: 打开一个文件，创建的是Tab，对书签同样生效
T: 打开一个文件，但是光标仍然留在NERDTree，创建的是Tab，对书签同样生效
i: 水平分割创建文件的窗口，创建的是buffer
gi: 水平分割创建文件的窗口，但是光标仍然留在NERDTree
s: 垂直分割创建文件的窗口，创建的是buffer
gs: 和gi，go类似
x: 收起当前打开的目录
X: 收起所有打开的目录
e: 以文件管理的方式打开选中的目录
D: 删除书签
P: 大写，跳转到当前根路径
p: 小写，跳转到光标所在的上一级路径
K: 跳转到第一个子路径
J: 跳转到最后一个子路径
<C-j>和<C-k>: 在同级目录和文件间移动，忽略子目录和子文件
C: 将根路径设置为光标所在的目录
u: 设置上级目录为根路径
U: 设置上级目录为跟路径，但是维持原来目录打开的状态
r: 刷新光标所在的目录
R: 刷新当前根路径
I: 显示或者不显示隐藏文件
f: 打开和关闭文件过滤器
q: 关闭NERDTree
A: 全屏显示NERDTree，或者关闭全屏
```
配置相关内容，下面是我文件的配置内容
`.vimrc` 文件中的内容
```vim
set number
set ruler
set showcmd
set showtabline=0               "隐藏顶部标签栏"
set guioptions-=r               "隐藏右侧滚动条"
set guioptions-=L               "隐藏左侧滚动条"
set guioptions-=b               "隐藏底部滚动条"
set cursorline                  "突出显示当前行"
" set cursorcolumn                突出显示当前列"
set langmenu=zh_CN.UTF-8        "显示中文菜单
syntax on
set history=1000
" set fileencodings=utf-8,gb2312,gbk,cp936,latin-1
set fileencoding=utf-8
set termencoding=utf-8
set fileformat=unix
set encoding=utf-8
colorscheme desert
set t_Co=256
set wildmenu
set autoindent
set smartindent					" 开启新行时使用智能自动缩进
set expandtab
set tabstop=4
set backspace+=indent,eol,start "set backspace&可以对其重置
set softtabstop=4
set shiftwidth=4
set showmatch					" 插入括号时，短暂地跳转到匹配的对应括号
set scrolloff=3                 "距离顶部和底部3行"
set laststatus=2                "命令行为两行"
au FileType html,python,vim,javascript setl shiftwidth=4
au FileType html,python,vim,javascript setl tabstop=4
au FileType java,php setl shiftwidth=4
au FileType java,php setl tabstop=4
set hlsearch					" 搜索时高亮显示被找到的文本
set mouse=a                     "启用鼠标"
set selection=exclusive
set selectmode=mouse,key
set matchtime=5
set ignorecase                  "忽略大小写"
set incsearch
set noexpandtab                 "不允许扩展table"
set whichwrap+=<,>,h,l
filetype on
filetype plugin on
filetype indent on
set cindent
set completeopt=longest,menu
set noeb
set autowrite
set cursorline
set clipboard+=unnamed
set autoread



set nocompatible              " 去除VI一致性,必须
filetype off                  " 必须
" set the runtime path to include vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where vundle should install plugins
"call vundle#begin('~/some/path/here')
" let vundle manage vundle, required
Plugin 'vundlevim/vundle.vim'
map<F6> :CommandT <CR>
Plugin 'preservim/tagbar'
map<F5> :TagbarOpen <CR>
let g:tagbar_ctags_bin='/usr/local/bin/ctags'
let Tagbar_Show_One_File=1
let Tagbar_WinWidt=11
let Tagbar_Use_Right_Window=1
"autocmd BufReadPost *.py,*.cpp,*.c,*.h,*.hpp,*.cc,*.cxx call tagbar#autoopen() 
autocmd VimEnter  *  nested :TagbarOpen
Plugin 'scrooloose/nerdcommenter'
Plugin 'bling/vim-airline'
let g:airline_powerline_fonts = 1

" the following are examples of different formats supported.
" keep plugin commands between vundle#begin/end.
" plugin on github repo
Plugin 'tpope/vim-fugitive'

Plugin 'preservim/nerdtree'
"使用F3键快速调出和隐藏它
map <F3> :NERDTreeToggle<CR>
let NERDTreeChDirMode=0
let g:NERDTreeDirArrowExpandable = '▸'
let g:NERDTreeDirArrowCollapsible = '▾'
" open NERDTree automatically when VIM start
" autocmd vimenter * NERDTree
let NERDTreeIgnore = ['\.pyc$', '\.swp', '\.swo', '\.vscode', '__pycache__']
"How can I open NERDTree automatically when vim starts up on opening a directory?
"autocmd StdinReadPre * let s:std_in=1
"autocmd VimEnter * if argc() == 1 && isdirectory(argv()[0]) && !exists("s:std_in") | exe 'NERDTree' argv()[0] | wincmd p | ene | endif
" 关闭vim时，如果打开的文件除了NERDTree没有其他文件时，它自动关闭，减少多次按:q!
" Exit Vim if NERDTree is the only window remaining in the only tab.
"autocmd BufEnter * if tabpagenr('$') == 1 && winnr('$') == 1 && exists('b:NERDTree') && b:NERDTree.isTabTree() | quit | endif
" Close the tab if NERDTree is the only window remaining in it.
autocmd BufEnter * if winnr('$') == 1 && exists('b:NERDTree') && b:NERDTree.isTabTree() | quit | endif

Plugin 'xuyuanp/nerdtree-git-plugin'
let g:NERDTreeGitStatusIndicatorMapCustom = {
                \ 'Modified'  :'✹',
                \ 'Staged'    :'✚',
                \ 'Untracked' :'✭',
                \ 'Renamed'   :'➜',
                \ 'Unmerged'  :'═',
                \ 'Deleted'   :'✖',
                \ 'Dirty'     :'✗',
                \ 'Ignored'   :'☒',
                \ 'Clean'     :'✔︎',
                \ 'Unknown'   :'?',
                \ }
let g:NERDTreeGitStatusUseNerdFonts = 1 " you should install nerdfonts by yourself. default: 0
Plugin 'tiagofumo/vim-nerdtree-syntax-highlight'
Plugin 'ryanoasis/vim-devicons'
" loading the plugin
let g:webdevicons_enable = 1
" adding the flags to NERDTree
let g:webdevicons_enable_nerdtree = 1
" adding the custom source to unite
let g:webdevicons_enable_unite = 1
" adding the column to vimfiler
let g:webdevicons_enable_vimfiler = 1
" adding to vim-airline's tabline
let g:webdevicons_enable_airline_tabline = 1
" adding to vim-airline's statusline
let g:webdevicons_enable_airline_statusline = 1
" ctrlp glyphs
let g:webdevicons_enable_ctrlp = 1
" adding to vim-startify screen
let g:webdevicons_enable_startify = 1
" adding to flagship's statusline
let g:webdevicons_enable_flagship_statusline = 1
let g:WebDevIconsOS = 'Darwin'

Plugin 'morhetz/gruvbox'
" plugin from http://vim-scripts.org/vim/scripts.html
Plugin 'l9'
" git plugin not hosted on github
" plugin 'git://git.wincent.com/command-t.git'
" git repos on your local machine (i.e. when working on your own plugin)
" plugin 'file:///home/gmarik/path/to/plugin'
" the sparkup vim script is in a subdirectory of this repo called vim.
" pass the path to set the runtimepath properly.
" plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
" avoid a name conflict with l9
" plugin 'user/l9', {'name': 'newl9'}
" all of your plugins must be added before the following line
noremap <F4> :!ctags -R<CR>
let Tlist_Auto_Open = 1
noremap <F2> :TlistToggle<CR>
"let Tlist_Use_Left_Windo =1             "在左侧窗口中显示taglist窗
Plugin 'Yggdroot/LeaderF'
"MatchTagAlways
Plugin 'Valloric/MatchTagAlways'
"Markdown语法高亮
"Bundle 'plasticboy/vim-markdown'
"markdown实时显示
Plugin 'suan/vim-instant-markdown'

"indentLine 代码缩进线标志线
Plugin 'Yggdroot/indentLine'
let g:indentLine_char = '┆'
let g:indentLine_color_term = 239
let g:indentLine_enabled = 1

"autocmd VimEnter * nested:IndentLinesToggle
"delimitMate 自动补全引号(单引号/双引号/反引号), 括号(()[]{})
Plugin 'Raimondi/delimitMate'

Plugin 'scrooloose/syntastic'
" Syntastic ------------------------------
" show list of errors and warnings on the current file
nmap <F6> :Errors<CR>
" turn to next or previous errors, after open errors list
nmap <F7> :lnext<CR>
nmap <F8> :lprevious<CR>
" check also when just opened the file
let g:syntastic_check_on_open = 1
" syntastic checker for javascript.
" eslint is the only tool support JSX.
" If you don't need write JSX, you can use jshint.
" And eslint is slow, but not a hindrance
" let g:syntastic_javascript_checkers = ['jshint']
let g:syntastic_javascript_checkers = ['eslint']
" don't put icons on the sign column (it hides the vcs status icons of signify)
let g:syntastic_enable_signs = 0
" custom icons (enable them if you use a patched font, and enable the previous 
" setting)
let g:syntastic_error_symbol = '✗'
let g:syntastic_warning_symbol = '⚠'
let g:syntastic_style_error_symbol = '✗'
let g:syntastic_style_warning_symbol = '⚠'

call vundle#end()            " required
filetype plugin indent on    " required
" to ignore plugin indent changes, instead use:
"filetype plugin on
"
" brief help
" :pluginlist          - list configured plugins
" :plugininstall(!)    - install (update) plugins
" :pluginsearch(!) foo - search (or refresh cache first) for foo
" :pluginclean(!)      - confirm (or auto-approve) removal of unused plugins
"
" see :h vundle for more details or wiki for faq
" put your non-plugin stuff after this line
“ nnoremap能将一个组合快捷键映射为另一个快捷键。no部分，指的是Vim的正常模式（Normal Mode）
nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>
set guifont=<FONT_NAME>:h<FONT_SIZE>
set guifont=DroidSansMono\ Nerd\ Font:h11
" or:
set guifont=DroidSansMono_Nerd_Font:h11

```

# tmux - 终端复用器
全称：`terminal multiplexer`
用于一个窗口操作多个会话的工具

安装：
```sh
brew install tmux
```
安装后，可以输入session，来创建窗口 并进入`tmux`
```sh
tmux new -s <session-name>
```

配置文件：`~/.tmux.conf`
`ctrl+b` 是在`tmux`操作的
```sh
# 在tmux中时，退出(detach)，同时按住ctrl和b，松开再按d。
ctrl+b d

# 重新进入tmux， 控制台输入
#target-session是你要进入的tmux session
tmux attach -t <target-session>
#简写：
tmux a -t <target-session>

# 在控制台界面下，使用命令tmux ls来获取target-session
tmux ls
# 进入target-session为20的窗口：
tmux attach -t 20 
# or
tmux a -t 20
# 进入tmux之后会得到很多sessions, 

#会话切换
#在窗口间切换， session 中已经有了两个窗口
#切换到 0：bash 这个窗口，步骤如下：
#按 Ctrl-B 组合键，然后松开,按数字 0 键。

#关闭session有如下方式：
# 在控制台界面，关闭所有sessions：
tmux kill-server
# 在控制台界面，关闭指定session：
tmux kill-session -t <target-session>
```
