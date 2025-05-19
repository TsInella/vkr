import React from 'react';
import PhotoCarousel from '../components/PhotoCarousel';
import { Card, Typography, Divider, Row, Col, Image } from 'antd';
import styles from './MainPage.module.scss';
import processImage from '../assets/proccess.png'; // Изображение для процесса
import rulesImage from '../assets/rules.png';
import Header from "../components/Header"; // Изображение для правил

const { Title, Paragraph, Text } = Typography;

const MainPage: React.FC = () => {
  return (
      <>
        <Header/>
      <div className={styles.mainContainer}>
        {/* Карусель вверху страницы */}
        <div className={styles.carouselWrapper}>
          <PhotoCarousel />
        </div>

        {/* Основной контент страницы */}
        <div className={styles.contentContainer}>
          <Card className={styles.contentCard}>
            <Title level={2} className={styles.mainTitle}>Процесс получения пропуска</Title>
            <Title level={3} className={styles.akonTitle}>АКОН</Title>

            {/* Блок с фото и текстом процесса */}
            <Row gutter={24} className={styles.imageTextSection}>
              <Col xs={24} md={10} lg={8}>
                <Image
                    src={processImage}
                    alt="Процесс получения пропуска"
                    className={styles.sectionImage}
                    preview={false}
                />
              </Col>
              <Col xs={24} md={14} lg={16}>
                <Paragraph className={styles.description}>
                  Дети доступны в территории порта и подводной полиции, действующих вправо. Пропуск выдается на основании
                  предварительной регистрации и подачи заявления о финансовых обязательствах порта. В прогулку оставалось
                  данное правило для работников, подверженных власти и сроки последствия на территории порта. Каждый пропуск
                  действует только для того, касаемых мест транспортного средства, для которых он был выше.
                </Paragraph>
              </Col>
            </Row>

            <Divider className={styles.divider} />

            {/* Блок с фото и текстом правил */}
            <div className={styles.sectionWithTitle}>
              <Title level={3} className={styles.sectionTitle}>Правила</Title>
              <Row gutter={24} className={styles.imageTextSection}>
                <Col xs={24} md={10} lg={8}>
                  <Image
                      src={rulesImage}
                      alt="Правила получения пропуска"
                      className={styles.sectionImage}
                      preview={false}
                  />
                </Col>
                <Col xs={24} md={14} lg={16}>
                  <Paragraph className={styles.rules}>
                    Настоящее правило устанавливают требования к безопасности, приведу работы и попадания на территорию порта
                    для всех участников процесса оттудования и прочих оказаний, возлагаясь работникам автостоянского и других
                    организаций, а также посетителей.
                    <br /><br />
                    <Text strong>1, 2</Text> обладающих уголовным обязательством для всего этапа, имеющимся на территории порта.
                    <br />
                    <Text strong>3, 5</Text> базовые коррекции данных проект, нормативные качества этих данных с территории порта,
                    а также временные ответственные характеристики с действующими законодательством.
                  </Paragraph>
                </Col>
              </Row>
            </div>

            <Divider className={styles.divider} />

            <div className={styles.footerSection}>
              <div className={styles.contactsColumn}>
                <Text strong className={styles.columnTitle}>Контакты</Text>
                <div className={styles.contactItem}>
                  <Text>Аконберна гл.</Text>
                </div>
                <div className={styles.contactItem}>
                  <Text>Аконберна гл.</Text>
                </div>
                <div className={styles.contactItem}>
                  <Text>8-113–456-79-30</Text>
                </div>
                <div className={styles.contactItem}>
                  <Text>9-113–456-79-90</Text>
                </div>
              </div>

              <div className={styles.contactsColumn}>
                <Text strong className={styles.columnTitle}>Страницы</Text>
                <div className={styles.contactItem}>
                  <Text>Главная</Text>
                </div>
                <div className={styles.contactItem}>
                  <Text>Заявки</Text>
                </div>
                <div className={styles.contactItem}>
                  <Text>Личный кабинет</Text>
                </div>
                <div className={styles.contactItem}>
                  <Text>Создать заявку</Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      </>
  );
};

export default MainPage;