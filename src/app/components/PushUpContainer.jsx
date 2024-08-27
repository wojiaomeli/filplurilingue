import React from 'react';
import PushUp from './PushUp';
import { IoMdGlobe } from "react-icons/io";
import { RiGroupLine } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { BsMegaphone } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";

const PushUpContainer = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 px-8">
        <PushUp
          title="Méthodologie"
          description="Mieux comprendre la méthodologie d’enseignement dans une classe bilingue."
          color="rgba(228, 0, 1, 1)" // Rouge
          icon={<FiSettings className="text-redF text-6xl" />}
          link="/methodologie" // Ajoutez le lien approprié
          className="pushup"
        />

        <PushUp
          title="Pour la classe"
          description="Proposer des activités motivantes dans la classe grâce à des fiches pédagogiques."
          color="rgba(253, 205, 0, 1)" // Jaune
          icon={<GrGroup className="text-yellowF text-6xl" />}
          link="/classe" // Ajoutez le lien approprié
          className="pushup"
        />

        <PushUp
          title="Promotion"
          description="Valoriser et promouvoir la langue française et l’enseignement des disciplines en français."
          color="rgba(126, 179, 1, 1)" // Vert
          icon={<BsMegaphone className="text-greenF text-6xl" />}
          link="/promotion" // Ajoutez le lien approprié
          className="pushup"
        />

        <PushUp
          title="Pays"
          description="Connaître les caractéristiques de l’enseignement bilingue francophone par pays."
          color="rgba(93, 0, 115, 1)" // Violet
          icon={<IoMdGlobe className="text-purplF text-6xl" />}
          link="/pays" // Ajoutez le lien approprié
          className="pushup"
        />
      </div>
    </div>
  );
};

export default PushUpContainer;
