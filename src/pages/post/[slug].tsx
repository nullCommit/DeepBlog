import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { MdOutlineWatchLater } from 'react-icons/md';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  return (
    <>
      <div className={styles.bannerContainer}>
        <img src="/images/teste.png" alt="banner" />
      </div>

      <div className={styles.container}>
        <div className={styles.title}>
          <strong>Artigo tal</strong>

          <div className={styles.infoContainer}>
            <div className={styles.dateContainer}>
              <FiCalendar size="16px" color="#bbbbbb" />
              <time>15 Mar 2022</time>
            </div>

            <div className={styles.authorContainer}>
              <FiUser size="16px" color="#bbbbbb" />
              <span>Allan Duarte</span>
            </div>

            <div className={styles.timeContainer}>
              <MdOutlineWatchLater size="16px" color="#bbbbbb" />
              <span>4 min</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dicta
            voluptatum molestias. Voluptatibus, deserunt reprehenderit? Sequi
            laudantium voluptates repellendus voluptatibus! Praesentium autem
            asperiores pariatur sit. Soluta labore expedita ipsa sunt? <br />{' '}
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dicta
            voluptatum molestias. Voluptatibus, deserunt reprehenderit? Sequi
            laudantium voluptates repellendus voluptatibus! Praesentium autem
            asperiores pariatur sit. Soluta labore expedita ipsa sunt?
          </p>
        </div>
      </div>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
