<script setup>
const navItems = [
  { label: "招牌", href: "#signature" },
  { label: "菜单", href: "#menu" },
  { label: "空间", href: "#space" },
  { label: "订座", href: "#booking" },
];

const broths = [
  {
    number: "01",
    name: "松露菌汤锅",
    detail:
      "云南野菌、鸡骨高汤与少量松露油慢煨，入口清润，适合先涮鲜切牛肉与时蔬。",
  },
  {
    number: "02",
    name: "古法牛油辣锅",
    detail:
      "手炒牛油底料，花椒、辣椒与香料层层释放，辣得有分寸，香气更绵长。",
  },
  {
    number: "03",
    name: "青柠番茄锅",
    detail:
      "熟番茄熬出酸甜底味，加入青柠与罗勒提香，适合海鲜、豆制品与手打丸类。",
  },
];

const menuItems = [
  { name: "雪花和牛", description: "薄切现涮，油脂细密", price: "¥168" },
  { name: "手切鲜牛肉", description: "每日到店修切，肉感紧实", price: "¥88" },
  { name: "黑虎虾滑", description: "虾肉含量高，口感弹润", price: "¥68" },
  { name: "山野菌拼盘", description: "牛肝菌、姬松茸、虫草花", price: "¥58" },
  { name: "手工鲜毛肚", description: "七上八下，脆嫩入味", price: "¥62" },
  { name: "桂花冰汤圆", description: "餐后清甜，解辣回甘", price: "¥28" },
];

const spaces = [
  {
    title: "临窗雅座",
    text: "适合两到四人慢慢吃一顿火锅，木色、石材与柔和光线让晚餐更松弛。",
  },
  {
    title: "半开放包间",
    text: "适合家庭聚会和小型商务宴请，保留私密感，也不失火锅的热闹气氛。",
  },
  {
    title: "茶席等位区",
    text: "到店先饮一杯冷泡茶，等位、候友、点单都能从容一点。",
  },
];

const shopInfo = [
  { label: "地址", value: "杭州市上城区松风路 18 号" },
  { label: "营业时间", value: "11:00 - 22:30" },
  { label: "订座电话", value: "0571-8808-1818" },
];
</script>

<template>
  <header class="site-header" aria-label="主导航">
    <a class="brand" href="#top" aria-label="松间火锅首页">
      <span class="brand-mark">松</span>
      <span>松间火锅</span>
    </a>
    <nav aria-label="页面导航">
      <a v-for="item in navItems" :key="item.href" :href="item.href">
        {{ item.label }}
      </a>
    </nav>
    <a class="header-cta" href="tel:057188081818">电话订座</a>
  </header>

  <main id="top">
    <section class="hero" aria-label="松间火锅首页首屏">
      <div
        class="hero-bg"
        role="img"
        aria-label="现代中式餐厅里的雅致火锅餐桌"
      ></div>
      <div class="hero-shade"></div>
      <div class="hero-content">
        <p class="eyebrow">现代中式火锅 · 雅致茶席 · 精选鲜涮</p>
        <h1>在松间，慢慢吃一席有温度的火锅。</h1>
        <p class="hero-copy">
          松间火锅以清雅空间、手炒锅底和当季鲜涮为核心，把热气腾腾的中式火锅做得更从容。适合约会、家宴，也适合下班后好好吃一餐。
        </p>
        <div class="hero-actions" aria-label="首页主要操作">
          <a class="primary-btn" href="#menu">查看菜单</a>
          <a class="ghost-btn" href="#booking">预约到店</a>
        </div>
      </div>
      <aside class="hero-note" aria-label="今日推荐">
        <span>今日推荐</span>
        <strong>松露菌汤锅 · ¥128</strong>
        <small>建议搭配雪花和牛、山野菌拼盘与青笋尖，清鲜开场，越涮越有回甘。</small>
      </aside>
    </section>

    <section class="signature-section" id="signature">
      <div class="section-heading">
        <p class="eyebrow dark">招牌锅底</p>
        <h2>三种底味，照顾一桌人的不同偏爱。</h2>
      </div>
      <div class="broth-grid">
        <article v-for="broth in broths" :key="broth.number">
          <span>{{ broth.number }}</span>
          <h3>{{ broth.name }}</h3>
          <p>{{ broth.detail }}</p>
        </article>
      </div>
    </section>

    <section class="feature-split" aria-label="手工锅底介绍">
      <div
        class="food-photo"
        role="img"
        aria-label="火锅餐桌上的牛肉、蔬菜和铜锅"
      ></div>
      <div class="feature-copy">
        <p class="eyebrow">手工慢熬</p>
        <h2>锅底不抢食材的鲜，却能把每一口托起来。</h2>
        <p>
          牛油辣锅强调香气层次，菌汤锅保留清润底味，番茄锅用酸甜收住油脂。每一锅开餐前再调味，减少厚重感，让肉、菌、菜都有自己的存在感。
        </p>
        <dl class="facts">
          <div>
            <dt>6 小时</dt>
            <dd>鸡骨与菌菇慢熬成汤，开锅前再补鲜。</dd>
          </div>
          <div>
            <dt>3 档</dt>
            <dd>清润、微辣、重香可选，适合不同聚餐场景。</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="menu-section" id="menu">
      <div class="section-heading">
        <p class="eyebrow dark">精选菜单</p>
        <h2>鲜涮、菌蔬、甜品，一桌刚刚好。</h2>
      </div>
      <div class="menu-board" aria-label="精选菜单">
        <article v-for="item in menuItems" :key="item.name">
          <div>
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
          </div>
          <strong>{{ item.price }}</strong>
        </article>
      </div>
    </section>

    <section class="space-section" id="space">
      <div class="space-copy">
        <p class="eyebrow dark">用餐空间</p>
        <h2>有火锅的热气，也有茶馆的安静。</h2>
        <p>
          松间火锅用浅木、石材与低照度灯光营造舒适节奏。空间不刻意喧闹，保留锅气、谈笑与一顿晚餐应有的松弛。
        </p>
      </div>
      <div class="space-list" aria-label="餐厅空间特色">
        <article v-for="space in spaces" :key="space.title">
          <h3>{{ space.title }}</h3>
          <p>{{ space.text }}</p>
        </article>
      </div>
    </section>

    <section class="booking" id="booking">
      <div>
        <p class="eyebrow">预约订座</p>
        <h2>今晚想吃火锅，就来松间。</h2>
        <p>支持 2-8 人小桌预留，包间和多人聚餐可提前电话确认。</p>
      </div>
      <div class="booking-info" aria-label="门店信息">
        <div v-for="item in shopInfo" :key="item.label">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
        </div>
        <a class="primary-btn light" href="tel:057188081818">电话订座 0571-8808-1818</a>
      </div>
    </section>
  </main>
</template>
