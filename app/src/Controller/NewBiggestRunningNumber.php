<?php


namespace App\Controller;


use App\Entity\BookingOperation;
use App\Entity\Project;
use App\Entity\RunningNumber;
use App\Service\ProductHashGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;

class NewBiggestRunningNumber
{

    private $entityManager;

    /**
     * @var ProductHashGenerator
     */
    private $productHashGenerator;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke($id): RunningNumber
    {

        $bookingRepository = $this->entityManager->getRepository(BookingOperation::class);
        $booking = $bookingRepository->findBy(array("year" => $id), array('runningNumber' => 'DESC'), 1);

        $runningNumber = 1;
        if(count($booking) > 0) {
            $runningNumber += $booking[0]->getRunningNumber();
        }

        $res = new RunningNumber();
        $res->setId(1);
        $res->setRunningNumber($runningNumber);

        return $res;
    }
}