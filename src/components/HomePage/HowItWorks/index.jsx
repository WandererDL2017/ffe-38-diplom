import './HowItWorks.css';

function HowItWorks() {
  return (
    <section className="HowItWorks__section" id="howItWorks">
      <div className="HowItWorks__container">
        <div className="HowItWorks__header">как это работает</div>
        <div className="HowItWorks__link">Узнать больше</div>
      </div>
      <div className="HowItWorks__benefitsBox">
        <div className="HowItWorks__benefit">
          <div className="HowItWorks__benefitPic HowItWorks__benefitFirst" />
          <div className="HowItWorks__benefitDiscription">Удобный заказ на сайте</div>
        </div>
        <div className="HowItWorks__benefit">
          <div className="HowItWorks__benefitPic HowItWorks__benefitSecond" />
          <div className="HowItWorks__benefitDiscription">Нет необходимости ехать в офис</div>
        </div>
        <div className="HowItWorks__benefit">
          <div className="HowItWorks__benefitPic HowItWorks__benefitThird" />
          <div className="HowItWorks__benefitDiscription">Огромный выбор направлений</div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
