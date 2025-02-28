import { Typography } from "@alfalab/core-components/typography";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import img from "../assets/img.png";
import { thxSt } from "./style.css";
import { appSt } from "../style.css.ts";

export const ThxLayout = () => {
  return (
    <>
      <div className={thxSt.container}>
        <img
          alt="Картинка каменного лица"
          src={img}
          width={225}
          className={thxSt.rocket}
        />
        <Typography.TitleResponsive
          font="system"
          tag="h1"
          view="large"
          defaultMargins
          weight="bold"
        >
          Только тссс
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          Вы поучаствовали в очень важном исследовании. Вы – наш герой!
        </Typography.Text>
      </div>

      <div className={appSt.bottomBtn}>
        <ButtonMobile block view="primary" href="">
          Хорошо
        </ButtonMobile>
      </div>
    </>
  );
};
