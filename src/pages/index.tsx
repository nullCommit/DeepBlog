import Head from 'next/head';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiCalendar, FiUser } from 'react-icons/fi';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Space Traveling</title>
      </Head>

      <main className={styles.container}>
        {postsPagination.results.map(post => (
          <div className={styles.content}>
            <h1>{post.data.title}</h1>

            <p>{post.data.subtitle}</p>

            <div className={styles.aboutContainer}>
              <div className={styles.dateContainer}>
                <FiCalendar size="16px" color="#bbbbbb" />
                <time>{post.first_publication_date}</time>
              </div>

              <div className={styles.authorContainer}>
                <FiUser size="16px" color="#bbbbbb" />
                <span>{post.data.author}</span>
              </div>
            </div>
          </div>
        ))}

        {postsPagination.next_page && (
          <div className={styles.button}>
            <a href="#">Carregar mais posts</a>
          </div>
        )}
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query<any>(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: [
        'post.title',
        'post.subtitle',
        'post.author',
        'post.banner',
        'post.content',
      ],
      pageSize: 2,
    }
  );

  // console.log(JSON.stringify(postsResponse, null, 2));

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      ),
      // first_publication_date: new Date(
      //   post.first_publication_date
      // ).toLocaleDateString('pt-BR', {
      //   day: '2-digit',
      //   month: 'short',
      //   year: 'numeric',
      // }),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results,
  };

  console.log(JSON.stringify(postsPagination, null, 2));

  return {
    props: {
      postsPagination,
    },
  };
};
