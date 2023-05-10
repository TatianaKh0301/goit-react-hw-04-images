import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { GalleryItem, GalleryItemImage, Wrapper, CloseButton, CloseIcon, LargeImage } from './ImageGalleryItem.styled';
export default function ImageGalleryItem({images}) {
    const [showModal, setShowModal] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }
    console.log("images", images);
    const activeImage = images[activeImageIndex];
        return(
            <Wrapper>
                {images.map(({ id, webformatURL, largeImageURL, tags }, index) => 
                    (<GalleryItem key={id} 
                        onClick = {() => setActiveImageIndex(index)}
                            >
                            <GalleryItemImage src={webformatURL} alt="ImageGalleryItem" onClick={openModal} />
                            {showModal && 
                                <Modal onClose = {closeModal}>
                                    <CloseButton type="button" onClick ={closeModal}><CloseIcon /></CloseButton>
                                    <LargeImage src={activeImage.largeImageURL} alt={activeImage.tags}/>
                                </Modal>}
                    </GalleryItem>)
                )}
            </Wrapper>  
        );
    }   


ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired
};