<?php


namespace App\Service;


use App\Entity\Project;
use App\Entity\Pump;
use App\Entity\PumpProperty;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class ProductHashGenerator
{

    public function generateProductMd5(Project $project): string {
        return md5(json_encode($this->getProjectArray($project)));
    }

    private function getProjectArray(Project $project) {
        $pumpArray = array();

        foreach ($project->getPumps() as $pump) {
            $pumpArray[] = $this->getPumpArray($pump);
        }

        return [$project->getDateUpdated(),
            $project->getDateCreated(),
            $project->getName(),
            $pumpArray];
    }

    private function getPumpArray(Pump $pump) {
        $pumpPropertiesArray = array();

        foreach ($pump->getPumpProperties() as $pumpProperty) {
            $pumpPropertiesArray[] = $this->getPumpPropertyArray($pumpProperty);
        }

        return [$pump->getDateManufactured(),
            $pump->getDateNextInspection(),
            $pump->getDateUpdated(),
            $pumpPropertiesArray];
    }

    private function getPumpPropertyArray(PumpProperty $pumpProperty) {
        return [$pumpProperty->getPropertyType(),
            $pumpProperty->getPropertyValue(),
            $pumpProperty->getDateCreated()];
    }


}