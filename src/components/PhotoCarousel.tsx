import React, { useRef } from "react";
import styles from './PhotoCarousel.module.scss';
import { Carousel } from "antd";
import ItemImage1 from '../assets/image.jpg';
import ItemImage2 from '../assets/image2.jpg';
import ItemImage3 from '../assets/image3.jpg';
import ItemImage4 from '../assets/image.jpg';

type PhotoCarouselProps = {
    images?: string[];
};

const PhotoCarousel = (props: PhotoCarouselProps) => {
    const carouselRef = useRef<any>(null);

    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };

    const imagesDefault = [ItemImage1, ItemImage2, ItemImage3, ItemImage4];
    const images = props.images || imagesDefault;

    return (
        <div className={styles.carouselContainer}>
            <Carousel
                ref={carouselRef}
                dots={true}
                arrows={false} // Отключаем стрелки
                className={styles.photoCarousel}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={styles.slide}
                        onClick={handleNext}
                    >
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className={styles.carouselImage}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default PhotoCarousel;