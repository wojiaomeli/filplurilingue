import React from 'react';
import PushUp from './PushUp';
import { IoMdGlobe } from "react-icons/io";
import { RiGroupLine } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { BsMegaphone } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";


const PushUpContainer = () => {
  return (
    <div className="flex justify-around gap-x-2">
      <PushUp
        title="Méthodologie"
        description="Mieux comprendre la méthodologie d’enseignement dans une classe bilingue."
        color="rgba(228, 0, 1, 1)" // Rouge
        icon={<FiSettings className="text-redF text-6xl" />}
        style={{ margin: '0 10px' }}
      />

<PushUp
        title="Pour la classe"
        description="Proposer des activités motivantes dans la classe grâce à des fiches pédagogiques."
        color="rgba(253, 205, 0, 1)" // Jaune
        icon={< GrGroup className="text-yellowF text-6xl" />}
        style={{ margin: '0 10px' }}
      />
      <PushUp
        title="Promotion"
        description="Valoriser et promouvoir la langue française et l’enseignement des disciplines en français."
        color="rgba(126, 179, 1, 1)" // Vert
        icon={< BsMegaphone className="text-greenF text-6xl" />}
        style={{ margin: '0 10px' }}
      />
     
      <div className="relative">
     
        <PushUp
          title="Pays   "
          description="Connaître les caractéristiques de l’enseignement bilingue francophone par pays."
          color="rgba(93, 0, 115, 1)" // Violet
          style={{ margin: '0 10px' }}
          icon={<IoMdGlobe className="text-purplF text-6xl" />} // Ajout de l'icône entre le texte et le bouton
          style={{ margin: '0 10px' }}
        />
      </div>
    </div>
  );
};

export default PushUpContainer;