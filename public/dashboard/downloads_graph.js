var chart;

function initiateGraph(labels, data) {
    var ctx1 = document.getElementById("chart-line").getContext("2d");

    var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, 'rgba(94, 114, 228, 0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(94, 114, 228, 0.0)');
    gradientStroke1.addColorStop(0, 'rgba(94, 114, 228, 0)');
    chart = new Chart(ctx1, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Downloads ",
                tension: 0.4,
                borderWidth: 0,
                pointRadius: 0,
                borderColor: "#5e72e4",
                backgroundColor: gradientStroke1,
                borderWidth: 3,
                fill: true,
                data,
                maxBarThickness: 6

            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        padding: 10,
                        color: '#fbfbfb',
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        color: '#ccc',
                        padding: 20,
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
            },
        },
    });
}

function darkMode(el) {
    const body = document.getElementsByTagName('body')[0];
    const hr = document.querySelectorAll('div:not(.sidenav) > hr');
    const sidebar = document.querySelector('.sidenav');
    const sidebarWhite = document.querySelectorAll('.sidenav.bg-white');
    const hr_card = document.querySelectorAll('div:not(.bg-gradient-dark) hr');
    const text_btn = document.querySelectorAll('button:not(.btn) > .text-dark');
    const text_span = document.querySelectorAll('span.text-dark, .breadcrumb .text-dark');
    const text_span_white = document.querySelectorAll('span.text-white');
    const text_strong = document.querySelectorAll('strong.text-dark');
    const text_strong_white = document.querySelectorAll('strong.text-white');
    const text_nav_link = document.querySelectorAll('a.nav-link.text-dark');
    const secondary = document.querySelectorAll('.text-secondary');
    const bg_gray_100 = document.querySelectorAll('.bg-gray-100');
    const bg_gray_600 = document.querySelectorAll('.bg-gray-600');
    const btn_text_dark = document.querySelectorAll('.btn.btn-link.text-dark, .btn .ni.text-dark');
    const btn_text_white = document.querySelectorAll('.btn.btn-link.text-white, .btn .ni.text-white');
    const card_border = document.querySelectorAll('.card.border');
    const card_border_dark = document.querySelectorAll('.card.border.border-dark');
    const svg = document.querySelectorAll('g');
    const navbarBrand = document.querySelector('.navbar-brand-img');
    const navbarBrandImg = navbarBrand.src;
    const navLinks = document.querySelectorAll('.navbar-main .nav-link, .navbar-main .breadcrumb-item, .navbar-main .breadcrumb-item a, .navbar-main h6');
    const cardNavLinksIcons = document.querySelectorAll('.card .nav .nav-link i');
    const cardNavSpan = document.querySelectorAll('.card .nav .nav-link span');
  
  
    if (!el.getAttribute("checked")) {
      body.classList.add('dark-version');
      if (navbarBrandImg.includes('logo-ct-dark.png')) {
        var navbarBrandImgNew = navbarBrandImg.replace("logo-ct-dark", "logo-ct");
        navbarBrand.src = navbarBrandImgNew;
      }
      for (var i = 0; i < cardNavLinksIcons.length; i++) {
        if (cardNavLinksIcons[i].classList.contains('text-dark')) {
          cardNavLinksIcons[i].classList.remove('text-dark');
          cardNavLinksIcons[i].classList.add('text-white');
        }
      }
      for (var i = 0; i < cardNavSpan.length; i++) {
        if (cardNavSpan[i].classList.contains('text-sm')) {
          cardNavSpan[i].classList.add('text-white');
        }
      }
      for (var i = 0; i < hr.length; i++) {
        if (hr[i].classList.contains('dark')) {
          hr[i].classList.remove('dark');
          hr[i].classList.add('light');
        }
      }
      for (var i = 0; i < hr_card.length; i++) {
        if (hr_card[i].classList.contains('dark')) {
          hr_card[i].classList.remove('dark');
          hr_card[i].classList.add('light');
        }
      }
      for (var i = 0; i < text_btn.length; i++) {
        if (text_btn[i].classList.contains('text-dark')) {
          text_btn[i].classList.remove('text-dark');
          text_btn[i].classList.add('text-white');
        }
      }
      for (var i = 0; i < text_span.length; i++) {
        if (text_span[i].classList.contains('text-dark')) {
          text_span[i].classList.remove('text-dark');
          text_span[i].classList.add('text-white');
        }
      }
      for (var i = 0; i < text_strong.length; i++) {
        if (text_strong[i].classList.contains('text-dark')) {
          text_strong[i].classList.remove('text-dark');
          text_strong[i].classList.add('text-white');
        }
      }
      for (var i = 0; i < text_nav_link.length; i++) {
        if (text_nav_link[i].classList.contains('text-dark')) {
          text_nav_link[i].classList.remove('text-dark');
          text_nav_link[i].classList.add('text-white');
        }
      }
      for (var i = 0; i < secondary.length; i++) {
        if (secondary[i].classList.contains('text-secondary')) {
          secondary[i].classList.remove('text-secondary');
          secondary[i].classList.add('text-white');
          secondary[i].classList.add('opacity-8');
        }
      }
      for (var i = 0; i < bg_gray_100.length; i++) {
        if (bg_gray_100[i].classList.contains('bg-gray-100')) {
          bg_gray_100[i].classList.remove('bg-gray-100');
          bg_gray_100[i].classList.add('bg-gray-600');
        }
      }
      for (var i = 0; i < btn_text_dark.length; i++) {
        btn_text_dark[i].classList.remove('text-dark');
        btn_text_dark[i].classList.add('text-white');
      }
      for (var i = 0; i < sidebarWhite.length; i++) {
        sidebarWhite[i].classList.remove('bg-white');
      }
      for (var i = 0; i < svg.length; i++) {
        if (svg[i].hasAttribute('fill')) {
          svg[i].setAttribute('fill', '#fff');
        }
      }
      for (var i = 0; i < card_border.length; i++) {
        card_border[i].classList.add('border-dark');
      }
      el.setAttribute("checked", "true");
    } else {
      body.classList.remove('dark-version');
      sidebar.classList.add('bg-white');
      if (navbarBrandImg.includes('logo-ct.png')) {
        var navbarBrandImgNew = navbarBrandImg.replace("logo-ct", "logo-ct-dark");
        navbarBrand.src = navbarBrandImgNew;
      }
      for (var i = 0; i < navLinks.length; i++) {
        if (navLinks[i].classList.contains('text-dark')) {
          navLinks[i].classList.add('text-white');
          navLinks[i].classList.remove('text-dark');
        }
      }
      for (var i = 0; i < cardNavLinksIcons.length; i++) {
        if (cardNavLinksIcons[i].classList.contains('text-white')) {
          cardNavLinksIcons[i].classList.remove('text-white');
          cardNavLinksIcons[i].classList.add('text-dark');
        }
      }
      for (var i = 0; i < cardNavSpan.length; i++) {
        if (cardNavSpan[i].classList.contains('text-white')) {
          cardNavSpan[i].classList.remove('text-white');
        }
      }
      for (var i = 0; i < hr.length; i++) {
        if (hr[i].classList.contains('light')) {
          hr[i].classList.add('dark');
          hr[i].classList.remove('light');
        }
      }
      for (var i = 0; i < hr_card.length; i++) {
        if (hr_card[i].classList.contains('light')) {
          hr_card[i].classList.add('dark');
          hr_card[i].classList.remove('light');
        }
      }
      for (var i = 0; i < text_btn.length; i++) {
        if (text_btn[i].classList.contains('text-white')) {
          text_btn[i].classList.remove('text-white');
          text_btn[i].classList.add('text-dark');
        }
      }
      for (var i = 0; i < text_span_white.length; i++) {
        if (text_span_white[i].classList.contains('text-white') && !text_span_white[i].closest('.sidenav') && !text_span_white[i].closest('.card.bg-gradient-dark')) {
          text_span_white[i].classList.remove('text-white');
          text_span_white[i].classList.add('text-dark');
        }
      }
      for (var i = 0; i < text_strong_white.length; i++) {
        if (text_strong_white[i].classList.contains('text-white')) {
          text_strong_white[i].classList.remove('text-white');
          text_strong_white[i].classList.add('text-dark');
        }
      }
      for (var i = 0; i < secondary.length; i++) {
        if (secondary[i].classList.contains('text-white')) {
          secondary[i].classList.remove('text-white');
          secondary[i].classList.remove('opacity-8');
          secondary[i].classList.add('text-dark');
        }
      }
      for (var i = 0; i < bg_gray_600.length; i++) {
        if (bg_gray_600[i].classList.contains('bg-gray-600')) {
          bg_gray_600[i].classList.remove('bg-gray-600');
          bg_gray_600[i].classList.add('bg-gray-100');
        }
      }
      for (var i = 0; i < svg.length; i++) {
        if (svg[i].hasAttribute('fill')) {
          svg[i].setAttribute('fill', '#252f40');
        }
      }
      for (var i = 0; i < btn_text_white.length; i++) {
        if (!btn_text_white[i].closest('.card.bg-gradient-dark')) {
          btn_text_white[i].classList.remove('text-white');
          btn_text_white[i].classList.add('text-dark');
        }
      }
      for (var i = 0; i < card_border_dark.length; i++) {
        card_border_dark[i].classList.remove('border-dark');
      }
      el.removeAttribute("checked");
    }
  };

async function get_download_data() {
    let data = await axios.get("/downloads", {
        headers: {
            "xsrf": window.localStorage.getItem("xsrf")
        }
    })
    let dcata = await data.data
    document.getElementById("tot-downloads").innerText = dcata.total
    let today_downloads = []
    let last_10_days = []
    const ONE_DAY = 8.64e+7
    const TEN_DAYS = 8.64e+8

    for (let i = 0; i < dcata.downloads.length; i++) {
        const element = dcata.downloads[i];
        if((Date.now() - element.time) < ONE_DAY) {
            today_downloads.push(element)
        }

        if((Date.now() - element.time) < TEN_DAYS) {
            last_10_days.push(element)
        }
    }
    document.getElementById("tod-downloads").innerHTML = (today_downloads.length)

    let data_to_send = {

    }
    let currentMonth = new Date(Date.now()).toLocaleString('en-us', { month: 'short' });

    for (let i = 0; i < last_10_days.length; i++) {
        const element = last_10_days[i];
        let now = new Date(element.time).getDate()

        data_to_send[now] != undefined ? data_to_send[now]++ : data_to_send[now] = 1
    }

    initiateGraph(Object.keys(data_to_send).map((v, i) => `${v} ${currentMonth}`), Object.values(data_to_send))
}

async function update_graph_Data() {
    let data = await axios.get("/downloads", {
        headers: {
            "xsrf": window.localStorage.getItem("xsrf")
        }
    })
    let dcata = await data.data
    document.getElementById("tot-downloads").innerText = dcata.total
    let today_downloads = []
    let last_10_days = []
    const ONE_DAY = 8.64e+7
    const TEN_DAYS = 8.64e+8

    for (let i = 0; i < dcata.downloads.length; i++) {
        const element = dcata.downloads[i];
        if((Date.now() - element.time) < ONE_DAY) {
            today_downloads.push(element)
        }

        if((Date.now() - element.time) < TEN_DAYS) {
            last_10_days.push(element)
        }
    }
    document.getElementById("tod-downloads").innerHTML = (today_downloads.length)

    let data_to_send = {

    }
    let currentMonth = new Date(Date.now()).toLocaleString('en-us', { month: 'short' });

    for (let i = 0; i < last_10_days.length; i++) {
        const element = last_10_days[i];
        let now = new Date(element.time).getDate()

        data_to_send[now] != undefined ? data_to_send[now]++ : data_to_send[now] = 1
    }

    // initiateGraph(Object.keys(data_to_send).map((v, i) => `${v} ${currentMonth}`), Object.values(data_to_send))

    chart.data.labels = Object.keys(data_to_send).map((v, i) => `${v} ${currentMonth}`)
    chart.data.datasets.forEach((dataset) => {
        dataset.data = Object.values(data_to_send)
    });
    chart.update()
}

document.getElementById("dark-version").checked = true
darkMode(document.getElementById("dark-version"))
get_download_data()

document.getElementById("refresh-btn").addEventListener("click", update_graph_Data)

// setInterval(async () => {
//     await update_graph_Data()
// }, 3000);