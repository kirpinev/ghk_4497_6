import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";
import React, { useState } from "react";
import home from "./assets/home.png";
import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { ThxLayout } from "./thx/ThxLayout";
import { Gap } from "@alfalab/core-components/gap";
import { StatusBadge } from "@alfalab/core-components/status-badge";
import { Grid } from "@alfalab/core-components/grid";
import { sendDataToGA } from "./utils/events.ts";

interface Service {
  name: string;
  key: string;
  value: number;
  descriptions: string[];
}

interface Category {
  name: string;
  services: Service[];
}

const one: Category = {
  name: "Регулярные платежи",
  services: [
    {
      name: "Оплата ипотеки",
      key: "mortgage",
      value: 0,
      descriptions: ["Дата и сумма платежа", "Оплата в один клик"],
    },
    {
      name: "Налоги на недвижимость",
      key: "property_tax",
      value: 0,
      descriptions: ["Отслеживайте налоги по вашей недвижимости"],
    },
    {
      name: "Домашний интернет",
      key: "internet",
      value: 0,
      descriptions: ["Дата и сумма платежа", "Оплата в один клик"],
    },
    {
      name: "Разделить платеж",
      key: "split_payment",
      value: 0,
      descriptions: [
        "Возможность разделить оплату счета по ЖКУ на несколько частей или перенести его",
      ],
    },
    {
      name: "Семейный бюджет",
      key: "family_budget",
      value: 0,
      descriptions: [
        "Откладывайте деньги на cемейный счет и оплачивайте им регулярные платежи",
      ],
    },
    {
      name: "Оплата ЖКУ кэшбэком",
      key: "zku_cashback",
      value: 0,
      descriptions: ["Используйте накопленный кэшбэк для оплаты ЖКУ"],
    },
  ],
};

const two: Category = {
  name: "Контроль расходов",
  services: [
    {
      name: "Календарь платежей",
      key: "payment_calendar",
      value: 0,
      descriptions: [
        "Отслеживайте и управляйте своими расходами, связанными с домом",
      ],
    },
    {
      name: "Статистика и прогноз",
      key: "statistics",
      value: 0,
      descriptions: [
        "Графики потребления воды и электричества",
        "Прогноз будущих платежей",
      ],
    },
    {
      name: "Оспорить начисление",
      key: "dispute",
      value: 0,
      descriptions: ["Поможем оспорить счет ЖКУ, с которым вы не согласны"],
    },
  ],
};

const three: Category = {
  name: "Все для дома",
  services: [
    {
      name: "Оценка стоимости",
      key: "estimation",
      value: 0,
      descriptions: [
        "Следите за изменением рыночной стоимости вашей недвижимости",
      ],
    },
    {
      name: "Вызов мастера",
      key: "master",
      value: 0,
      descriptions: ["Быстрый вызов электрика, сантехника, аварийной службы"],
    },
    {
      name: "Выписки",
      key: "extract",
      value: 0,
      descriptions: ["Заказ справок и выписок по объекту недвижимости"],
    },
    {
      name: "Страховки",
      key: "insurance",
      value: 0,
      descriptions: [
        "Оформление и отслеживание ваших страховых полисов по объекту недвижимости",
      ],
    },
    {
      name: "Маркет",
      key: "market",
      value: 0,
      descriptions: ["Товары для вашего дома и уюта с кэшбэком от банка"],
    },
    {
      name: "Советы",
      key: "recommendations",
      value: 0,
      descriptions: [
        "Раздел с советами, как экономить на расходах по дому, и другой полезной информацией",
      ],
    },
  ],
};

const variants: Array<Category> = [three, two, one];

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const toggleService = (service: Service) => {
    const find = selectedServices.find(
      (savedService) => savedService.name === service.name,
    );

    if (find) {
      service.value = 0;

      setSelectedServices([
        ...selectedServices.filter(
          (savedService) => savedService.name !== service.name,
        ),
      ]);
    } else {
      service.value = 1;
      setSelectedServices([...selectedServices, service]);
    }
  };

  const submit = () => {
    setLoading(true);

    const result = variants
      .reduce((acc: Service[], curr) => [...acc, ...curr.services], [])
      .reduce((acc: Record<string, number>, curr) => {
        acc[curr.key] = curr.value;

        return acc;
      }, {});

    sendDataToGA({ ...result }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <Typography.TitleResponsive
            tag="h1"
            view="medium"
            font="system"
            weight="bold"
            style={{ padding: "0 1rem" }}
          >
            Сервисы для вашего дома
          </Typography.TitleResponsive>
          <Typography.Text view="primary-large" color="secondary">
            Выберите сервисы для вашего удобства и комфорта – всё, что нужно для
            заботы о доме, уже здесь.
          </Typography.Text>
          <img src={home} alt="Картинка дома" />
        </div>

        <Gap size={8} />

        <div>
          {variants.map((variant, index, array) => {
            return (
              <React.Fragment key={variant.name}>
                <Typography.TitleResponsive
                  tag="h3"
                  view="small"
                  font="system"
                  weight="bold"
                >
                  {variant.name}
                </Typography.TitleResponsive>
                <Gap size={16} />
                <Grid.Row gutter={{ mobile: 8, desktop: 16 }}>
                  {variant.services.map((service, index) => {
                    return (
                      <Grid.Col width="6" key={index} className={appSt.gridRow}>
                        <div
                          className={appSt.product}
                          onClick={() => {
                            toggleService(service);
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "8px",
                              gap: "0.4rem",
                              height: "85px",
                              position: "relative",
                            }}
                          >
                            <Typography.Text
                              view="primary-medium"
                              weight="bold"
                              style={{ flex: 1 }}
                            >
                              {service.name}
                            </Typography.Text>
                            <div className={appSt.selection}></div>
                            {selectedServices.find(
                              (savedService) =>
                                savedService.name === service.name,
                            ) && (
                              <StatusBadge
                                view="positive-checkmark"
                                className={appSt.statusBadge}
                              />
                            )}
                          </div>

                          <div
                            style={{
                              backgroundColor: "#F8F8F8",
                              padding: "8px",
                              borderRadius: "1rem",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.4rem",
                            }}
                          >
                            {service.descriptions.map((description) => {
                              return (
                                <Typography.Text
                                  view="primary-small"
                                  key={description}
                                >
                                  {description}
                                </Typography.Text>
                              );
                            })}
                          </div>
                        </div>
                      </Grid.Col>
                    );
                  })}
                </Grid.Row>
                {array.length - 1 !== index && <Gap size={16} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile
          loading={loading}
          disabled={selectedServices.length === 0}
          block
          view="primary"
          onClick={submit}
        >
          Добавить
        </ButtonMobile>
      </div>
    </>
  );
};
