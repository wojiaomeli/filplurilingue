import React from 'react';
import Link from 'next/link';

const ScientificCommitteeButton = () => {
  return (
    <Link href="/comite" passHref legacyBehavior>
      <a className="w-36 h-8 bg-redFil text-white uppercase text-xs font-semibold rounded-md hover:bg-redFil-400 duration-300 flex items-center justify-center">
        Comité scientifique
      </a>
    </Link>
  );
};

export default ScientificCommitteeButton;
