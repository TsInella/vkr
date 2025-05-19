import React from "react";
import { Button, Card, Result } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Card className={styles.notFoundCard}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Извините, страница, которую вы посетили, не существует."
                    extra={
                        <Button
                            type="primary"
                            className={styles.backButton}
                            onClick={() => navigate("/")}
                        >
                            Вернуться на главную
                        </Button>
                    }
                />
            </Card>
        </div>
    );
};

export default NotFoundPage;