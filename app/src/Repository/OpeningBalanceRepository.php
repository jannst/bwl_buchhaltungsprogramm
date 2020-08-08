<?php

namespace App\Repository;

use App\Entity\OpeningBalance;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method OpeningBalance|null find($id, $lockMode = null, $lockVersion = null)
 * @method OpeningBalance|null findOneBy(array $criteria, array $orderBy = null)
 * @method OpeningBalance[]    findAll()
 * @method OpeningBalance[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OpeningBalanceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OpeningBalance::class);
    }

    // /**
    //  * @return OpeningBalance[] Returns an array of OpeningBalance objects
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
    public function findOneBySomeField($value): ?OpeningBalance
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
