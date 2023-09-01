import Head from 'next/head';
import { useRouter } from 'next/router';

const DEFAULT_TITLE = 'Med uses their Head';
const DEFAULT_DESCRIPTION = "Objectively, were the best ocean because we all know eachothers names";
const DEFAULT_IMAGE = '';

const removeUrlParams = (url: string) => {
  const [path] = url.split('?');
  return path;
};

interface Props {
  title?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  cannonicalUrl?: string;
}

const MetaHead: React.FC<Props> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  imageUrl = DEFAULT_IMAGE,
  imageAlt,
  cannonicalUrl,
}) => {
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="desc" />
      <meta property="og:site_name" content="Med Name Game" key="ogsitename" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:image" content={imageUrl} key="ogimage" />

      <meta name="twitter:title" content={title} key="twittertitle" />
      <meta name="twitter:description" content={description.slice(0, 200)} key="twitterdesc" />
      <meta name="twitter:image" content={imageUrl} key="twitterimage" />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} key="twitterimagealt" />}
      <meta name="twitter:site" content="@thejackobrien" key="twittersite" />
      <meta name="twitter:card" content="summary_large_image" key="twittercard" />
      <meta name="twitter:creator" content="@thejackobrien" key="twittercreator" />
      {/* <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>👋</text></svg>"
      /> */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
      />
      {/** Set a cannonical tag to the current url */}
      {(cannonicalUrl || typeof window !== 'undefined') && (
        <link
          rel="canonical"
          href={cannonicalUrl || `${window.location.origin}${removeUrlParams(router.asPath)}`}
        />
      )}
      {(cannonicalUrl || typeof window !== 'undefined') && (
        <meta
          property="og:url"
          content={cannonicalUrl || `${window.location.origin}${removeUrlParams(router.asPath)}`}
        />
      )}
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
};

export default MetaHead;
