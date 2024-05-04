import React from 'react'
import galleryImages from './galleryImages'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

const MasonryImageGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
        <Masonry gutter="1.2rem">
            {
                galleryImages.map((item,index) => (
                    <img 
                    className='masonry_img'
                    src={item} 
                    key={index} 
                    alt="" 
                    style={{width:'100%', display:'block',borderRadius:'10px'}} />
                ))
            }
        </Masonry>
    </ResponsiveMasonry>
  )
}

export default MasonryImageGallery