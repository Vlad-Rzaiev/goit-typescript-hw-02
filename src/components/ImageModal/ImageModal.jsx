import { useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import Modal from 'react-modal';
import style from './ImageModal.module.css';

Modal.setAppElement('#root');

export default function ImageModal({
  isOpen,
  onClose,
  imgItem,
  prevImg,
  nextImg,
  isFirstImg,
  isLastImg,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = e => {
      if (e.key === 'ArrowLeft' && !isFirstImg) {
        prevImg();
      }
      if (e.key === 'ArrowRight' && !isLastImg) {
        nextImg();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, prevImg, nextImg, isFirstImg, isLastImg]);

  return (
    <Modal
      className={style.modal}
      overlayClassName={style.overlay}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      {imgItem && (
        <>
          <div className={style.imgDescrWrap}>
            <img
              className={style.img}
              src={imgItem.urls.regular}
              alt={imgItem.alt_description || 'Image'}
            />

            {imgItem.description && (
              <p className={style.imgDescription}>{imgItem.description}</p>
            )}
            {imgItem.likes && (
              <p className={style.imgLikes}>Likes👍 {imgItem.likes}</p>
            )}
          </div>

          <div className={style.aboutUserWrap}>
            {imgItem.user.profile_image.small && (
              <img
                className={style.imgUser}
                src={imgItem.user.profile_image.small}
                alt="User avatar"
              />
            )}
            <div className={style.userInfoWrap}>
              {imgItem.user.name && (
                <p className={style.userName}>
                  Uploaded by: {imgItem.user.name}
                </p>
              )}
              {imgItem.user.location && (
                <p className={style.userLocation}>
                  Location: {imgItem.user.location}
                </p>
              )}
            </div>
          </div>
        </>
      )}

      <button className={style.closeBtn} type="button" onClick={onClose}>
        <RxCross2 size={30} />
      </button>

      <button
        className={style.prevImg}
        type="button"
        onClick={prevImg}
        disabled={isFirstImg}
      >
        <RiArrowLeftSLine className={style.prevIcon} size={30} />
      </button>
      <button
        className={style.nextImg}
        type="button"
        onClick={nextImg}
        disabled={isLastImg}
      >
        <RiArrowRightSLine className={style.nextIcon} size={30} />
      </button>
    </Modal>
  );
}
