'use strict';
{
    const TRIPLE_BAR = '\u2261';
    const SIDEBAR_WIDTH = '20%';

    const init = () => {
        createContentDiv();
        showMenuButton();
    };

    const createContentDiv = () => {
        const children = Array.from(document.body.children);

        const content = document.createElement('div');
        content.classList.add('content', 'content-without-sidebar');

        children.forEach(el => content.append(el));

        document.body.append(content);
    }

    const showSidebar = () => {
        const sidebar = document.createElement("div");
        sidebar.classList.add('sidebar');

        sidebar.append(createCloseButton());
        sidebar.append(createTableOfContents());

        document.body.prepend(sidebar);

        document.querySelector(".content").classList.remove('content-without-sidebar');
        document.querySelector(".content").classList.add('content-with-sidebar');
    };

    const showMenuButton = () => {
        const menu = document.createElement('button');
        menu.innerText = `${TRIPLE_BAR} MENU`;
        menu.addEventListener("click", () => {
            showSidebar();
            menu.remove();
        });

        document.body.prepend(menu);
    }

    const createCloseButton = () => {
        const closeButton = document.createElement("button");
        closeButton.innerText = 'X';
        closeButton.addEventListener('click', onSidebarClose);
        return closeButton;
    }

    const createTableOfContents = () => {
        const headings = Array.from(document.querySelectorAll("h2"));
        headings.forEach((h, index) => h.id = index);

        const titles = headings.map((h) => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#${h.id}">${h.innerText}</a>`;
            return li;
        });

        const toc = document.createElement("ul");
        titles.forEach(title => toc.append(title));
        return toc;
    }

    const onSidebarClose = () => {
        document.querySelector('.sidebar').remove();
        showMenuButton();
        document.querySelector(".content").classList.remove('content-with-sidebar');
        document.querySelector(".content").classList.add('content-without-sidebar');
    }

    init();
}