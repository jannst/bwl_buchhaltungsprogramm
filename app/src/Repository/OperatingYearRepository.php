<?php

namespace App\Repository;

use App\Entity\OperatingYear;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method OperatingYear|null find($id, $lockMode = null, $lockVersion = null)
 * @method OperatingYear|null findOneBy(array $criteria, array $orderBy = null)
 * @method OperatingYear[]    findAll()
 * @method OperatingYear[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OperatingYearRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OperatingYear::class);
    }

    // /**
    //  * @return OperatingYear[] Returns an array of OperatingYear objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?OperatingYear
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
