/* Компоненты для главной страницы (текст с результатом и кнопка равно) */
const resultFieldComp = {
  render: () => {
    return `
      <p id="result">0</p>
    `;
  }
}

const equalsBtnComp = {
  render: () => {
    return `
      <button id="equalsBtn">=</button>
    `;
  }
}

/* Главная страница */
export const MainPageComponent = {
  id: 'main',
  title: 'Калькулятор',
  render: () => {
    return `
      <div class="header">
        <div class="header--screen">
          ${resultFieldComp.render()}
        </div>
      </div>
      <div class="calc--btns">
        <div class="btns-item">
          <button class="first-row clear-btn">AC</button>
        </div>
        <div class="btns-item">
          <button class="first-row">±</button>
        </div>
        <div class="btns-item">
          <button class="first-row">÷</button>
        </div>
        <div class="btns-item">
          <button class="first-row">×</button>
        </div>
        <div class="btns-item">
          <button>7</button>
        </div>
        <div class="btns-item">
          <button>8</button>
        </div>
        <div class="btns-item">
          <button>9</button>
        </div>
        <div class="btns-item">
          <button>-</button>
        </div>
        <div class="btns-item">
          <button>4</button>
        </div>
        <div class="btns-item">
          <button>5</button>
        </div>
        <div class="btns-item">
          <button>6</button>
        </div>
        <div class="btns-item">
          <button>+</button>
        </div>
        <div class="btns-item">
          <button>1</button>
        </div>
        <div class="btns-item">
          <button>2</button>
        </div>
        <div class="btns-item">
          <button>3</button>
        </div>
        <div class="btns-item equals-btn">
          ${equalsBtnComp.render()}
        </div>
        <div class="btns-item zero-btn">
          <button>0</button>
        </div>
        <div class="btns-item">
          <button>.</button>
        </div>
        <div class="btns-item">
          <button>%</button>
        </div>
      </div>
    `;
  }
};