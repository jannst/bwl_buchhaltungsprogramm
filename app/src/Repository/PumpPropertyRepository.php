<?php

namespace App\Repository;

use App\Entity\PumpProperty;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method PumpProperty|null find($id, $lockMode = null, $lockVersion = null)
 * @method PumpProperty|null findOneBy(array $criteria, array $orderBy = null)
 * @method PumpProperty[]    findAll()
 * @method PumpProperty[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PumpPropertyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PumpProperty::class);
    }

    // /**
    //  * @return PumpProperty[] Returns an array of PumpProperty objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PumpProperty
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
